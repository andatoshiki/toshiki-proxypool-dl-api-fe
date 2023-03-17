import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import { filesize } from "filesize";

/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Home() {
  const { data, error } = useSWR('https://raw.toshiki.dev/andatoshiki/toshiki-proxypool-dl-api-fe/api/api', fetcher)
  if (error) return <svg className={styles.loaderSvg} width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path className={styles.spinnerOut} d="M0 0 L 32 0, 32 32, 0 32, 0 0" stroke="#6c757d" fill="transparent"/><path className={styles.spinnerIn} d="M8 8 L 8 24, 24 24, 24 8, 8 8" stroke="#007bff" strokeWidth="1" fill="transparent"/></svg>
  if (!data) return <svg className={styles.loaderSvg} width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path className={styles.spinnerOut} d="M0 0 L 32 0, 32 32, 0 32, 0 0" stroke="#6c757d" fill="transparent"/><path className={styles.spinnerIn} d="M8 8 L 8 24, 24 24, 24 8, 8 8" stroke="#007bff" strokeWidth="1" fill="transparent"/></svg>

  // Filter beta items, key containes "beta" or "alpha"
  const beta_items = data.filter(item => item.key.includes("beta") || item.key.includes("alpha"))
  const release_items = data.filter(item => !item.key.includes("beta") && !item.key.includes("alpha") && item.key.includes("gz"))
  const config_items = data.filter(item => item.key.includes("config"))

  return (
    <div className={styles.container}>
      <div className="container">
        <Head>
          <title>Toshiki's Proxypool Mirror</title>
          <meta name="description" content="Toshiki's ProxyPool Download Mirror" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andatoshiki/toshiki-cdn@master/fa6pro/css/all.min.css"/>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <main className={styles.main}>
          <div className="ms-1 py-4 fw-bold">
            <h1 className={styles.title}>
              Toshiki's ProxyPool Mirror
            </h1>
            <h5 className="text-muted lh-base">Maintained by @andatoshiki at LoliLab</h5>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <h5 className='ms-2'>Releases</h5>

              <ul className="list-group">
                {release_items.map((item) => (
                  <a href={"https://dl-proxypool-r2.toshiki.dev/" + item.key}>
                    <li className="ms-2 me-auto list-group-item list-group-item-action justify-content-between align-items-start">
                      {item.key}
                      <span>&nbsp;</span><span className="badge bg-primary rounded-pill float-right">{filesize(item.size)}</span>
                      </li>
                  </a>
                ))}
              </ul>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <h5 className='ms-2'>Pre-Releases</h5>
              <ul className="list-group">
                {beta_items.map((item) => (
                  <a href={"https://dl-proxypool-r2.toshiki.dev/" + item.key}>
                    <li className="ms-2 me-auto list-group-item list-group-item-action justify-content-between align-items-start">
                      {item.key}
                      <span>&nbsp;</span><span className="badge bg-primary rounded-pill float-right">{filesize(item.size)}</span>
                      </li>
                  </a>
                ))}
              </ul>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <h5 className='ms-2'>Configs</h5>
              <ul className="list-group">
                {config_items.map((item) => (
                  <a href={"https://dl-proxypool-r2.toshiki.dev/" + item.key}>
                    <li className="ms-2 me-auto list-group-item list-group-item-action justify-content-between align-items-start">
                      {item.key}
                      <span>&nbsp;</span><span className="badge bg-primary rounded-pill float-right">{filesize(item.size)}</span>
                      </li>
                  </a>
                ))}
              </ul>
            </div>
            
          </div>

          <center className='ms-2'>
            <footer className='border-top mt-4 p-3'>
              Crafted with {' '}
              <span className="text-danger card-text"><i className="fa-solid fa-heart-pulse" aria-hidden="true"></i></span> by <a href='https://www.toshiki.dev/' className='card-link'>Anda Toshiki</a> and <a href="www.chenskiro.com">chenskiro</a> at <a href="https://github.com/lililab">LoliLabs</a>
              <br />
              <span className='card-text'>Artifacts mirror update frequency: <code>0 0 * * *</code>, 24 hours/scan</span>
              <br />
              <p className='border-top mt-3 p-3 text-left'>This mirror service is proudly hosted and powered upon <a href="https://www.cloudflare.com"></a>Cloudflare and its affiliated products, relied on <a href="https://workers.cloudflare.com">Workers</a> for serverless API computing with generous free tier, <a href="https://pages.cloudflare.com">Pages</a> for download page showcasing, <a href="https://www.cloudflare.com/products/r2/">R2</a> for low-cost and egress-free object storage. If you have any concerns or questions regarding the service, consider submitting an issue and suggest changes on <a href='https://github.com/toshiki-proxypool-dl-api/isssues'>GitHub</a>; or email to <a href='mailto:hello@toshiki.dev'>hello@toshiki.dev</a> is also welcomed. <small>This is project is <a href="https://github.com/andatoshiki/toshiki-proxypool-dl-api">open sourced</a></small></p>
            </footer>
          </center>
        </main>

      </div>
    </div>

  )
}


export default Home;
