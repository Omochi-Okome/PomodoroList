export const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません。';
    case 'auth/user-disabled':
      return 'このユーザーアカウントは無効化されています。';
    case 'auth/user-not-found':
      return 'ユーザーが見つかりません。';
    case 'auth/wrong-password':
      return 'パスワードが正しくありません。';
    case 'auth/email-already-in-use':
      return 'このメールアドレスは既に使用されています。';
    case 'auth/weak-password':
      return 'パスワードが弱すぎます。';
    case 'auth/too-many-requests':
      return 'リクエストが多すぎます。後で再試行してください。';
    default:
      return '認証エラーが発生しました。';
  }
}
