---
title: "Vitepress"
sidebar:
  attrs: { id: tutorial }
---

detail in vitepress [document](https://vitepress.dev/guide/getting-started)
But directly use it would has problem becasue of environment.We need to do the following
1. add `.github/workflows/deploy.yml` in project root
    
    ```yml



    # .github/workflows/deploy.yml

    name: Deploy VitePress site to Pages

    on:
    push:
        branches: [main] 
    workflow_dispatch:

    permissions:
    contents: read
    pages: write
    id-token: write

    concurrency:
    cancel-in-progress: false
    group: pages

    jobs:
    build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
            with:
            node-version: 20
            cache: npm
        
        - name: Install dependencies and build
            run: |
            npm install
            npm run docs:build 

        - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
            # 确保这里是 VitePress 的默认输出目录
            path: docs/.vitepress/dist 

    deploy:
        environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
        needs: build
        runs-on: ubuntu-latest
        steps:
        - name: Deploy to GitHub Pages
            uses: actions/deploy-pages@v4
            id: deployment
    ```
2. `docs/.vitepress/config.mts`, add `base: '/reopsitory-name/'` in defineConfig
   
3. package.json add devDependencies

    ```json
    {
    "scripts": {
        "docs:dev": "vitepress dev docs",
        "docs:build": "vitepress build docs",
        "docs:preview": "vitepress preview docs"
    },
    "devDependencies": {
        "vitepress": "^1.6.4"
    }
    }
    ```

4. `npm install`generate "package-lock.json"