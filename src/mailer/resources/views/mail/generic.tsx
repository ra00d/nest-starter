import { Mjml } from '@faire/mjml-react';
import { MailmanBody } from '../components/body';
import { MailmanBodyBuilder } from '../components/bodyBuilder';
import { MailmanFooter } from '../components/footer';
import { MailmanHead } from '../components/head';
import { MailmanHeader } from '../components/header';

export const GenericMail = (payload: Record<string, any>) => {
  return (
    <Mjml>
      <MailmanHead
        title={payload.meta?.title}
        preview={payload.meta?.preview}
      />

      <MailmanBody>
        <>
          <MailmanHeader config={payload._templateConfig} />
          <MailmanBodyBuilder
            config={payload._templateConfig}
            fields={payload.genericFields}
          />
          <MailmanFooter config={payload._templateConfig} />
        </>
      </MailmanBody>
    </Mjml>
  );
};
