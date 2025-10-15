import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Translate } from '@styled-icons/bootstrap';
import { Bars } from '@styled-icons/fa-solid';
import * as Ant from 'antd';
import { useTranslation } from 'react-i18next';
import { useOutlet } from 'reconnect.js';

const navItems = [
  { path: '/', name: '首頁' },
  { path: '/about', name: '關於' },
];

export default function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [dimension] = useOutlet('dimension');

  const [drawer, setDrawer] = React.useState(false);

  const changeLanguage = React.useCallback(
    (lang) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return (
    <Wrapper>
      <div className="container">
        <div
          className="title"
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={new URL('../assets/logo.jpg', import.meta.url).href} height="30%" />
          {/* <h2 style={{ fontSize: '20px', lineHeight: 1, marginLeft: 16 }}>示範網站</h2> */}
        </div>

        {dimension.device === 'pc' && (
          <Ant.Space size={16}>
            {navItems.map((it, idx) => (
              <Link to={it.path} key={idx}>
                {it.name}
              </Link>
            ))}
          </Ant.Space>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: dimension.device === 'mb' ? 'row-reverse' : 'row',
          }}
        >
          <Ant.Divider type="vertical" style={{ borderColor: '#ccc', height: 25 }} />
          <Ant.Dropdown
            menu={{
              items: [
                { key: 'zh-TW', label: t('langs.zh') },
                { key: 'en', label: t('langs.en') },
              ],
              onClick: ({ key }) => {
                changeLanguage(key);
              },
            }}
          >
            <Translate size={30} color="#333" style={{ cursor: 'pointer' }} />
          </Ant.Dropdown>
        </div>

        {dimension.device === 'mb' && (
          <Bars
            size={30}
            onClick={() => {
              setDrawer(true);
            }}
          />
        )}
      </div>

      <Ant.Drawer
        title="選單"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => {
          setDrawer(false);
        }}
        open={drawer}
      >
        <Ant.Menu
          mode="inline"
          onClick={(e) => {
            navigate(e.key);
            setDrawer(false);
          }}
          items={navItems.map((it) => ({ key: it.path, label: it.name }))}
        />
      </Ant.Drawer>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  height: var(--navBarHeight);
  box-shadow: 0 1px 8px #ccc;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 999;

  & > .container {
    height: 100%;
    display: flex;
    align-items: center;
  }

  & .title {
    display: flex;
    align-items: center;
    margin-right: auto;
    height: 100%;
  }
`;
