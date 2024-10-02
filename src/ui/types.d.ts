export interface CNavigationsLink {
  label: string;
  icon?: JSX.Element;
  href?: string;
  to?: string;
  onClick?: () => void;
  hidden?: boolean;
  children?: CNavigationsLink[];
}
