import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Layout = React.lazy(() => import('../layouts/Layout'));
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));

function PageWithHelmet(props) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Helmet>
        <title>{t(`${props.pageKey}.title`)} | 示範網站</title>
      </Helmet>
      {props.children}
    </React.Fragment>
  );
}

const routerConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home />, pageKey: 'home' },
      { path: 'about', element: <About />, pageKey: 'about' },
    ],
  },
];

const router = createHashRouter(
  routerConfig.map(({ path, element, children }) => {
    return {
      path,
      element,
      children: children.map((it) => {
        return {
          path: it.path,
          element: <PageWithHelmet pageKey={it.pageKey}>{it.element}</PageWithHelmet>,
        };
      }),
    };
  })
);

export default router;
