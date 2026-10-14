import type { PermissionResponse } from 'expo-camera';
import { Camera } from 'lucide-react-native';
import { Linking, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { IconBadge } from '@/components/ui/icon-badge';
import { Brand, Spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';

type CameraPermissionProps = {
  permission: PermissionResponse;
  onRequest: () => void;
};

/** Explains why the camera is needed before the system prompt is shown. */
export function CameraPermission({ permission, onRequest }: CameraPermissionProps) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const blocked = !permission.canAskAgain;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.four,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: Spacing.four,
        backgroundColor: Brand.background,
      }}>
      <IconBadge Icon={Camera} size={88} />

      <View style={{ gap: Spacing.two, maxWidth: 360 }}>
        <Text style={{ color: Brand.text, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
          {t.permission.title}
        </Text>
        <Text style={{ color: Brand.textSecondary, fontSize: 16, lineHeight: 22, textAlign: 'center' }}>
          {blocked ? t.permission.blockedMessage : t.permission.message}
        </Text>
      </View>

      <Button
        label={blocked ? t.permission.openSettings : t.permission.allow}
        onPress={blocked ? () => Linking.openSettings() : onRequest}
        style={{ paddingHorizontal: Spacing.five }}
      />
    </View>
  );
}
