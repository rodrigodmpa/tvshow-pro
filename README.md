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


[Click here to access the production url](https://tvshow-pro-olive.vercel.app)

## Conceitos

### Serverside Rendering:

ServerSide Rendering (SSR) nada mais é que renderizar todos os dados no servidor (backend) e enviar para o cliente (frontend) o HTML completo. Esta estratégia é principalemtne usada para a SEO (Search Engine Optimization), isto é, alguns mecanismos de busca não possuem suporte para javascript, e com isso, alguns sites podem não ser corretamente indexados e serão prejudicados. Para isso, renderizamos tudo no server e enviamos o HTML no cliente para que este não precise utilizar JS.

Este projeto lista algumas séries de TV de alguns países. Para utilizar SSR pelo Next JS deve-se exportar uma funções assíncronas da página: `getServerSideProps`.

Esta função nada mais faz do que buscar dados no servidor para cada requisição a página.

Exemplo no projeto:

No nosso projeto, queremos mostrar os filmes de países os quais estão em uma API externa (api.tvmaze.com). A lista dos países ficará em uma rota chamada `localhost:3000/[country]`. 

Para isso, a função exportada terá o seguinte formato:

```javascript
export async function getServerSideProps(context) {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      shows: data // será passado para o componente da página como props
    }, 
  }
}
```