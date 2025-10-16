import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Bars } from '@styled-icons/fa-solid';
import { Language, ArrowDropDown } from '@styled-icons/material';
import * as Ant from 'antd';
import { useTranslation } from 'react-i18next';
import { useOutlet } from 'reconnect.js';

const navItems = [
  { path: '/', name: '首頁' },
  { path: '/about', name: '關於' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [dimension] = useOutlet('dimension');

  const [drawer, setDrawer] = React.useState(false);

  const changeLanguage = React.useCallback(
    (lang) => {
      if (lang === i18n.language) return;

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

        <nav>
          {dimension.device === 'pc' && (
            <Ant.Space size={16}>
              {navItems.map((it, idx) => (
                <Link to={it.path} key={idx}>
                  {it.name}
                </Link>
              ))}
            </Ant.Space>
          )}
          <Ant.Divider type="vertical" style={{ borderColor: '#ccc', height: 25, marginLeft: 16, marginRight: 16 }} />
          <Ant.Dropdown
            style={{ width: 'max-content', textAlign: 'justify' }}
            menu={{
              items: [
                { key: 'zh-TW', label: t('langs.zh') },
                { key: 'en', label: t('langs.en') },
              ],
              selectable: true,
              defaultSelectedKeys: [i18n.language],
              onClick: ({ key }) => {
                changeLanguage(key);
              },
            }}
          >
            <div style={{ display: 'flex', gap: 0, alignItems: 'center', cursor: 'pointer' }}>
              <Language size={30} color="#333" />
              <ArrowDropDown size={15} color="#333" />
            </div>
          </Ant.Dropdown>

          {dimension.device === 'mb' && (
            <Bars
              size={30}
              onClick={() => {
                setDrawer(true);
              }}
            />
          )}
        </nav>
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
          mode="vertical"
          style={{ border: 'none' }}
          selectedKeys={location.pathname}
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

  & nav {
    display: flex;
    gap: 8;
    align-items: center;
  }
`;
