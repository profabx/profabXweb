export type NavItemBasicProps = {
  key: string;
  label: string;
  labelEn?: string;
  link?: string;
  linkEn?: string;
};

export type NavItemProps = {
  items?: any[];
} & NavItemBasicProps;
