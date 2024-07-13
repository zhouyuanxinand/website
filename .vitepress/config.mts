import {defineConfig} from 'vitepress'
import {withMermaid} from 'vitepress-plugin-mermaid'
import implicitFigures from 'markdown-it-implicit-figures'
import { UserConfig } from 'vitepress';

import {themeTranslations, searchTranslations} from './translations'
import sidebar from "./sidebar";
import { Link } from '@element-plus/icons-vue'

const wechatIcon = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1711208744771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4250" data-darkreader-inline-fill="" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M690.1 377.4c5.9 0 11.8 0.2 17.6 0.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6 5.5 3.9 9.1 10.3 9.1 17.6 0 2.4-0.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-0.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-0.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4 0.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-0.1 17.8-0.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8z m-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1z m-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1z" p-id="4251"></path><path d="M866.7 792.7c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-0.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7 2.4 0 4.7-0.9 6.4-2.6 1.7-1.7 2.6-4 2.6-6.4 0-2.2-0.9-4.4-1.4-6.6-0.3-1.2-7.6-28.3-12.2-45.3-0.5-1.9-0.9-3.8-0.9-5.7 0.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9z m179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c-0.1 19.8-16.2 35.9-36 35.9z" p-id="4252"></path></svg>'

// https://vitepress.dev/reference/site-config
const viteConfig: UserConfig = {
    srcDir: 'docs',
    lang: 'zh-Hans',
    title: "ZhouYuanXin的个人网站",
    description: "周园鑫的个人技术博客",
    head: [
        ['link', {rel: 'apple-touch-icon', sizes: '180x180', href: '/website//favicon/Ilogo.png'}],
        ['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/website//favicon/Ilogo.png'}],
        ['link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/website//favicon/Ilogo.png'}],
        ['link', {rel: 'manifest', href: '/favicon/site.webmanifest'}],
        ['meta', {name: 'baidu-site-verification', content: 'codeva-QImGr6GPzt'}],
        ['meta', {name: 'google-site-verification', content: 'jIsu9AMup9671jCmwUv3HPEnckR57qCZmNrwE8_8aWU'}]
    ],
    sitemap: {
        // hostname: 'https://jluios.club'
    },
    themeConfig: {
        // 主题级选项
        // https://vitepress.dev/reference/default-theme-config
        ...themeTranslations,
        logo: '/logo.png',
        nav: [
            {
                text: 'java知识',
                items: [
                    {text: 'JVM', link: '/Java/JVM/index'},
                    {text: 'Maven', link:'/Java/Maven/index'},
                ]
            },
            {
                text: '其他知识',
                items: [
                    {text: '高斯波色取样', link: '/another/gaosi/index'},
                ]
            },
            {
                text: '分布式',
                items: [
                    {text: 'RPC框架', link: '/fenbushi/RPC/'},
                    {text: 'Raft一致性算法', link: '/fenbushi/raft'},
                ]
            },
            {
                text: '思维导图',
                items: [
                    {text: '通信演变', link: '/maps/',activeMatch: '/maps'},
                    {text: 'spring中Bean周期', link: '/resources/', activeMatch: '/resources'}
                ]
            },
            {
                text: '算法之路',
                items: [
                    {text: '多线程', link: '/mianshi/threads'},
                    {text: '面试算法题', link: '/suanfa'}
                ]
            },
            {
                text: '面经总结',
                items: [
                    {text: '多线程', link: '/mianshi/threads'},
                    {text: '大厂面经', link: '/mianshi/bigs'},
                ]
            },
            {
                text: '关于我',
                items: [
                    {text: '我的联系方式', link: '/about-us/index'},
                    {text: '我的个人介绍', link: '/about-us/mylife/index'},
                ]
            },

        ],
        sidebar: sidebar,

        socialLinks: [
            {icon: 'github', link: 'https://gitee.com/running-xin'},
            {icon: {svg: wechatIcon}, link: '/about-us/index'}
        ],

        footer: {
            message: '本站点基于 <a href="https://gitee.com/running-xin">MIT License</a> 发布',
            copyright: `联系邮箱3089729486qq.com`
        },

        search: {
            provider: 'local',
            options: {
                translations: searchTranslations
            }
        }
    },
    cleanUrls: true,

    markdown: {
        config: (md) => {
            md.use(implicitFigures, {
                figcaption: true,
                copyAttrs: '^class$'
            })
        },
        math: true,
        image: {
            lazyLoading: true
        }
    },
    vite: {
        build: {
            chunkSizeWarningLimit: 1600
        }
    }
}

export default withMermaid(defineConfig(viteConfig))
base: "/website/"

