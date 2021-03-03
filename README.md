This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Url


[Click here to access the production url](https://tvshow-pro-static.vercel.app)

## Conceitos

### Statically generated pages:

Como o próprio nome já diz, são páginas geradas estaticamente em tempo de build, fazendo com que a experiência de usuário fique melhor e que possam ser indexados por sistemas de busca como google.

Este projeto lista algumas séries de TV de alguns países. Para gerar páginas estáticas pelo Next JS a partir de parâmetros dinâmicos (no nosso caso o país) deve-se exportar duas funções assíncronas da página: `getStaticProps` e `getStaticPaths`.

A primeira nada mais faz do que buscar dados em tempo de build. Enquanto a segunda especifica quais as rotas dinâmicas devem ser pré-renderizadas baseado nos dados buscados na função de cima.

Exemplo do projeto:

No nosso projeto, queremos mostrar os filmes de países os quais estão em uma API externa (api.tvmaze.com). A lista dos países ficará em uma rota chamada `localhost:3000/[country]`. 

Para isso, as funções exportadas terão o seguinte formato:

```javascript
export async function getStaticProps(context) {
  const country = context.params.country;
  const res = await fetch(`https://.../${country}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      show: data
    }, //será passado para as props do componente da página
  }
}
```
e

```javascript
export async function getStaticPaths() {

  return {
     paths: [
      { params: { country: 'us' } },
      { params: { country: 'br' } }
    ],
    fallback: false ou true ou 'blocking'
  };
}
```
Neste caso, as páginas /us e /br serão geradas estaticamente com todos os filmes. Por outro lado, caso ousuário acesse um novo país, o NextJS terá três possíveis comportamentos dependendo do fallback:

- false: Todas as rotas novas irão cair em uma página default de Error 404.
- true: Aparecerá uma página padrão de fallback (normalmente algo como "Carregando ..."), enquanto isso, o Next irá gerar a página estaticamente e quando finalizada, trocará para a página com os dados.
- 'blocking': Quando uma nova página é requisitada, o Next fará uma requisição server side e enquanto isso a página ainda não terá sido carregada. Quando a página ficar pronta, aparecerá, e ficará estática para as próximas requisições. 