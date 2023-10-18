import { LanguageProvider } from './LanguageProvider';

type Lang = 'en' | 'cs' | 'fr' | 'zu';

type Props = {
  children: React.ReactNode;
  params: { lang: Lang };
};

export default async function Layout({ params, children }: Props) {
  const messages = await loadLinguiMessages(params.lang);

  return (
    <>
      <LanguageProvider lang={params.lang} messages={messages}>
        {children}
      </LanguageProvider>
    </>
  );
}

type MessagesFile = {
  messages: {
    [key: string]: string;
  };
};

async function loadLinguiMessages(lang: Lang) {
  if (process.env.NODE_ENV === 'development') {
    return ((await import(`@lingui/loader!@/locales/${lang}/messages.po`)) as MessagesFile).messages;
  } else {
    return ((await import(`@/locales/${lang}/messages`)) as MessagesFile).messages;
  }
}
