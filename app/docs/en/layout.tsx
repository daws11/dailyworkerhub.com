import DocsLocaleLayout from "../DocsLocaleLayout";

export default function EnglishDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsLocaleLayout lang="en">{children}</DocsLocaleLayout>;
}
