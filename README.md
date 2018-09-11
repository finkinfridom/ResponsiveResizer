# Introduction

This project aims to give an easy to use widget to be inserted inside page to resize the browser's window according to responsive breakpoints.

# Usage

To have this widget in your page you just need to:

1. Include the dist/style.css in your HTML file
2. Include the dist/resizer.min.js in your HTML file
3. Specify the viewports applied to the website
4. That's all!

Below you can see a sample HTML

```
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../dist/style.min.css" />
        <style>
        .sample-content {
            background-color: #000;
            color: #fff;
            padding: 100px
        }

        @media(max-width:1279px) {
            .sample-content {
                background-color: aqua;
                color: #000;
                padding: 20px;
            }
        }
    </style>
    </head>
    <body>
        <div class="sample-content">
            <h1>My First Heading</h1>

            <p>My first paragraph.</p>
        </div>
        <script src="../dist/resizer.min.js"></script>
        <script>
            window.resizerResponsive.initViewports({
                viewports: {
                    'Mobile': 300,
                    'Tablet': 760,
                    'Desktop': 1280
                },
                rootElement: '_rsz-root'
            });
        </script>
    </body>

</html>
```

# Sample

Here a sample URL: [https://wonderful-pike-648438.netlify.com/sample/index.html](https://wonderful-pike-648438.netlify.com/sample/index.html)

If you want to run it from your local machine you can simply run

```
npm run start
```

it will start a local server (port 8080) and then you can browse it at [http://localhost:8080/sample/index.html](http://localhost:8080/sample/index.html)
