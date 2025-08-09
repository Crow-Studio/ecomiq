import { Button, ButtonLink } from "../common/button";

interface TrackProps {
  name: string;
}

type TrackedButtonProps = React.ComponentProps<typeof Button> & TrackProps;

export const TrackedButton = ({ children, ref, ...props }: TrackedButtonProps) => {
  return (
    <Button {...props} ref={ref}>
      {children}
    </Button>
  );
};

type TrackedButtonLinkProps = React.ComponentProps<typeof ButtonLink> & TrackProps;

export const TrackedButtonLink = ({
  children,
  ref,
  ...props
}: TrackedButtonLinkProps) => {
  return (
    <ButtonLink {...props} ref={ref}>
      {children}
    </ButtonLink>
  );
};
