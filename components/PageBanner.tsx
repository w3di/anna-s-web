import PageBannerClient from "./PageBannerClient";

interface PageBannerProps {
  title: string;
  backgroundImage: string;
  subtitle?: string;
  eyebrow?: string;
  imageFilter?: string;
  imagePosition?: string;
}

export default function PageBanner(props: PageBannerProps) {
  return <PageBannerClient {...props} />;
}
