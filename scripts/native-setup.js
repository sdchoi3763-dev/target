// 네이티브 프로젝트 생성 후 카메라·마이크·사진 권한을 추가합니다.  사용: node scripts/native-setup.js android|ios
const fs = require('fs'), path = require('path');
const target = process.argv[2];
if (target === 'android') {
  const f = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
  let x = fs.readFileSync(f, 'utf8');
  const perms = ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO', 'android.permission.MODIFY_AUDIO_SETTINGS', 'android.permission.READ_MEDIA_IMAGES', 'android.permission.READ_MEDIA_AUDIO'];
  const add = perms.filter(p => !x.includes(`"${p}"`)).map(p => `    <uses-permission android:name="${p}" />`).join('\n');
  if (add) x = x.replace('</manifest>', add + '\n    <uses-feature android:name="android.hardware.camera" android:required="false" />\n</manifest>');
  fs.writeFileSync(f, x);
  console.log('AndroidManifest.xml: 권한 추가 완료');
} else if (target === 'ios') {
  const f = path.join('ios', 'App', 'App', 'Info.plist');
  let x = fs.readFileSync(f, 'utf8');
  const keys = {
    NSCameraUsageDescription: '점검 항목별 현장 사진을 촬영하기 위해 카메라를 사용합니다.',
    NSMicrophoneUsageDescription: '점검 항목별 음성 기록을 녹음하기 위해 마이크를 사용합니다.',
    NSPhotoLibraryUsageDescription: '사진첩의 현장 사진·로고·계통도를 첨부하기 위해 사진 보관함에 접근합니다.',
    NSPhotoLibraryAddUsageDescription: '보고서·사진을 사진 보관함에 저장합니다.'
  };
  const add = Object.entries(keys).filter(([k]) => !x.includes(`<key>${k}</key>`)).map(([k, v]) => `\t<key>${k}</key>\n\t<string>${v}</string>`).join('\n');
  // 「파일」 앱에서 TARGETLAB 사진 폴더가 보이도록
  const flags = ['UIFileSharingEnabled', 'LSSupportsOpeningDocumentsInPlace'].filter(k => !x.includes(`<key>${k}</key>`)).map(k => `\t<key>${k}</key>\n\t<true/>`).join('\n');
  if (add || flags) x = x.replace(/<dict>/, '<dict>\n' + [add, flags].filter(Boolean).join('\n'));
  fs.writeFileSync(f, x);
  console.log('Info.plist: 권한 설명 추가 완료');
} else {
  console.log('사용법: node scripts/native-setup.js android | ios');
  process.exit(1);
}
