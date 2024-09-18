# Ecom-SSR
Implementing On-Page SEO in an Angular application involves several steps to ensure your content is well-optimized for search engines. Since Angular applications are Single Page Applications (SPAs) and dynamically load content, there are specific challenges, particularly with search engines indexing content properly. Below is a step-by-step guide on how to optimize your Angular app for On-Page SEO.
Add Angular Universal:

#Use Angular CLI to add Angular Universal to your project:
1. ng add @nguniversal/express-engine
2. This will configure your project to use server-side rendering (SSR).

#Build and Serve the Application:
#Build your Angular Universal app using:
1. npm run build:ssr

#Serve the application:
1. npm run serve:ssr

#This will render your pages on the server, making them more SEO-friendly.


# Publish To IIS of Windows Server 2029
|___dist

|______|___browser
              |
|             |___index.html

|______|___server
              |
|             |___main.js

|___ nodeJs
       |____ node-v16.14.0

|___web.config

here, installed files of node-v16.14.0  will be placed

Web.Config:-

<?xml version="1.0" encoding="utf-8"?>

<configuration>
  
  <system.webServer>
  
   <handlers>
     
      <add name="iisnode" path="dist/server/main.js" verb="*" modules="iisnode" resourceType="Unspecified" />
      
    </handlers>
    
    <iisnode nodeProcessCommandLine="C:\inetpub\wwwroot\Restaurant\EcomWebSiteNew\nodejs\node-v16.14.0\node.exe" />
    
    <rewrite>
    
      <rules>
      
        <rule name="DynamicContent">
        
          <match url="/*" />
          
          <action type="Rewrite" url="dist/server/main.js"/>
          
        </rule>
        
        <rule name="StaticContent" stopProcessing="true">
        
          <match url="([\S]+[.](jpg|jpeg|gif|css|png|js|ts|cscc|less|ico|html|map|svg))" />
          
          <action type="None" />
          
        </rule>
        
      </rules>
      
    </rewrite>
    
    <staticContent>
    
      <clientCache cacheControlMode="UseMaxAge" />
      
      <remove fileExtension=".svg" />
      
      <remove fileExtension=".eot" />
      
      <remove fileExtension=".ttf" />
      
      <remove fileExtension=".woff" />
      
      <remove fileExtension=".woff2" />
      
      <remove fileExtension=".otf" />
      
      <remove fileExtension=".js" />
      
      <mimeMap fileExtension=".ttf" mimeType="application/octet-stream" />
      
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml"  />
      
      <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" />
      
      <mimeMap fileExtension=".woff" mimeType="application/x-woff" />
      
      <mimeMap fileExtension=".woff2" mimeType="application/x-woff" />
      
      <mimeMap fileExtension=".otf" mimeType="application/otf" />
      
      <mimeMap fileExtension=".js" mimeType="application/javascript" />
      
    </staticContent>
    
  </system.webServer>
  
  <system.diagnostics>
  
    <trace autoflush="true" />
    
    <sources>
    
      <source name="iisnode" switchValue="Verbose">
      
        <listeners>
        
          <add name="iisnode" type="System.Diagnostics.TextWriterTraceListener" initializeData="C:\iisnode.log" />
          
        </listeners>
        
      </source>
      
    </sources>
    
  </system.diagnostics>
  
 </configuration>
 
 # Conculsion 
