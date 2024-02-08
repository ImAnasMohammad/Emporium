import React from 'react'
import Animate from '../layouts/Animate'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import logo from '../assets/images/logo.jpeg'
const Layout = ({children,title,description,img,url,keywords}) => {
  title = title ??  process.env.REACT_APP_NAME;
  description = description ??  process.env.REACT_APP_DESC;
  img = img ?? logo;
  url = url ??  process.env.REACT_APP_URL;
  keywords = keywords ??  process.env.REACT_APP_KEYWORDS;

  return (
    <>
      <Helmet>
          { /* Standard metadata tags */ }
            <meta charSet="utf-8" />
            <link rel="canonical" href={url}/>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
          { /* End standard metadata tags */ }

          { /* Facebook tags */ }
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={img} />
          { /* End Facebook tags */ }


          { /* Twitter tags */ }
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
          { /* End Twitter tags */ }

      </Helmet>
      <Animate transition={{duration:.75,delay:0.2}}>
          <Header/>
          {children}
          <Footer/>
      </Animate>
    </>
  )
}

export default Layout