import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import authClient from '~/lib/auth/auth-client';

interface OauthButtonProps {
  provider: 'google';
  text: string;
}

export default function OauthButton({ provider, text }: OauthButtonProps) {
  const handleOauthLogin = async () => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/',
      });
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, {
          position: 'top-center',
        });
      }
      return toast.error('Login failed', {
        position: 'top-center',
      });
    }
  };
  return (
    <Button onClick={() => handleOauthLogin()}>
      <Icon icon="devicon:google" />
      {text}
    </Button>
  );
}
