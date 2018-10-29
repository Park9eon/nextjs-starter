/* eslint-disable react/no-danger */
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';

const { GA_TRACKING_ID } = process.env;

class MyDocument extends Document {
  render() {
    return (
      <html lang="ko">
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0"/>
        <meta name="theme-color"
              content="#aa2e25"/>
        <script async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
        <script dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
        }}/>
      </Head>
      <body>
      <Main/>
      <script dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape({ GA_TRACKING_ID })}` }}/>
      <NextScript/>
      </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = (ctx) => {
  const page = ctx.renderPage((Component) => (props) => (
    <JssProvider>
      <Component {...props}/>
    </JssProvider>
  ));

  return {
    ...page,
  };
};

export default MyDocument;
