import React from "react";

function ShareFunction() {
  return (
    <html>
      <head>
        <title>Hundie</title>
        {/* <!-- You can use Open Graph tags to customize link previews. */}
        {/* Learn more: https://developers.facebook.com/docs/sharing/webmasters --> */}
        <meta property="og:url" content="localhost:3000" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hundie" />
        <meta
          property="og:description"
          content="A trading APP to find things you need, trade them for items you own and would love exchange."
        />
        <meta
          property="og:image"
          content="https://www.your-domain.com/path/image.jpg"
        />
      </head>
      <body>
        {/* <!-- Load Facebook SDK for JavaScript --> */}
        <div id="fb-root"></div>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=1360278601145715&autoLogAppEvents=1"
          nonce="qnM4llOt"
        ></script>

        {/* <!-- Your share button code --> */}
         <div
            class="fb-share-button"
          data-href="http://localhost:3000/"
            data-layout="button"
            data-size="small"
            // flex-display="auto"
        //   aria-label="share"
        //   type="click"
        //   onClick={() => handleClick(item)}
        >
          <a
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2F&amp;src=sdkpreparse"
            class="fb-xfbml-parse-ignore"
          >
    
            Share 
          </a>
        </div> 
      </body>
    </html>
  );
}

export default ShareFunction;
