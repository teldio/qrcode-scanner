import { Stack } from 'expo-router';
import { Barcode, Check, Copy, History, QrCode, Trash2 } from 'lucide-react-native';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { IconBadge } from '@/components/ui/icon-badge';
import { IconButton } from '@/components/ui/icon-button';
import { Brand, Radius, Spacing } from '@/constants/theme';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useI18n, type Translations } from '@/i18n';
import { clearHistory, useScanHistory, type ScanRecord } from '@/storage/scan-history';
import { barcodeLabel, isLinearBarcode } from '@/utils/barcode';
import { haptics, ImpactFeedbackStyle } from '@/utils/haptics';

import { formatScanDate } from './format-scan-date';

export function HistoryScreen() {
  const history = useScanHistory();
  const { copy, copiedKey } = useCopyToClipboard();
  const { t } = useI18n();

  return (
    <>
      {/* The list must be the screen's first child for the large title to collapse on scroll. */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: Brand.background }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: Spacing.three,
          paddingVertical: Spacing.three,
        }}
        renderItem={({ item, index }) => (
          <HistoryRow
            record={item}
            isFirst={index === 0}
            isLast={index === history.length - 1}
            copied={copiedKey === item.id}
            onCopy={() => copy(item.data, item.id)}
            t={t}
          />
        )}
        ListEmptyComponent={<EmptyHistory t={t} />}
      />

      {/* Right side of the header, on the same row as the back button. Hidden when there is nothing to clear. */}
      <Stack.Screen
        options={{
          title: t.history.title,
          headerRight: history.length > 0 ? () => <ClearHistoryButton t={t} /> : undefined,
        }}
      />
    </>
  );
}

function ClearHistoryButton({ t }: { t: Translations }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t.history.clear}
      onPress={() => confirmClearHistory(t)}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.6 : 1,
      })}>
      <Trash2 size={22} color={Brand.primary} strokeWidth={2} />
    </Pressable>
  );
}

function confirmClearHistory(t: Translations) {
  const clear = () => {
    haptics.impact(ImpactFeedbackStyle.Medium);
    clearHistory();
  };

  // react-native-web does not implement Alert.
  if (process.env.EXPO_OS === 'web') {
    if (globalThis.confirm(`${t.history.clearTitle}\n\n${t.history.clearMessage}`)) clear();
    return;
  }

  Alert.alert(t.history.clearTitle, t.history.clearMessage, [
    { text: t.history.cancel, style: 'cancel' },
    { text: t.history.clearConfirm, style: 'destructive', onPress: clear },
  ]);
}

type HistoryRowProps = {
  record: ScanRecord;
  isFirst: boolean;
  isLast: boolean;
  copied: boolean;
  onCopy: () => void;
  t: Translations;
};

function HistoryRow({ record, isFirst, isLast, copied, onCopy, t }: HistoryRowProps) {
  const Icon = isLinearBarcode(record.type) ? Barcode : QrCode;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        paddingVertical: Spacing.three,
        paddingHorizontal: Spacing.three,
        backgroundColor: Brand.sheet,
        borderCurve: 'continuous',
        borderTopLeftRadius: isFirst ? Radius.md : 0,
        borderTopRightRadius: isFirst ? Radius.md : 0,
        borderBottomLeftRadius: isLast ? Radius.md : 0,
        borderBottomRightRadius: isLast ? Radius.md : 0,
      }}>
      <IconBadge Icon={Icon} size={44} />

      <View style={{ flex: 1, gap: Spacing.one }}>
        <Text
          selectable
          numberOfLines={2}
          style={{ color: Brand.text, fontSize: 16, lineHeight: 21, fontWeight: '600' }}>
          {record.data}
        </Text>
        <Text style={{ color: Brand.textSecondary, fontSize: 13 }}>
          {barcodeLabel(record.type)} · {formatScanDate(record.scannedAt, t)}
        </Text>
      </View>

      <IconButton
        Icon={copied ? Check : Copy}
        accessibilityLabel={copied ? t.clipboard.copiedAction : t.clipboard.copyAction}
        size={44}
        active={copied}
        onPress={onCopy}
      />

      {isLast ? null : (
        <View
          style={{
            position: 'absolute',
            left: Spacing.three + 44 + Spacing.three,
            right: 0,
            bottom: 0,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Brand.border,
          }}
        />
      )}
    </View>
  );
}

function EmptyHistory({ t }: { t: Translations }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.three,
        paddingHorizontal: Spacing.four,
      }}>
      <IconBadge Icon={History} size={72} />
      <View style={{ gap: Spacing.one, alignItems: 'center' }}>
        <Text style={{ color: Brand.text, fontSize: 20, fontWeight: '700' }}>
          {t.history.emptyTitle}
        </Text>
        <Text style={{ color: Brand.textSecondary, fontSize: 15, textAlign: 'center' }}>
          {t.history.emptyMessage}
        </Text>
      </View>
    </View>
  );
}
