function setIframeHeight( iframeId ) /** IMPORTANT: All framed documents *must* have a DOCTYPE applied **/
{
    var ifDoc, ifRef = document.getElementById( iframeId );

    try
    {
        ifDoc = ifRef.contentWindow.document.documentElement;
    }
    catch( e )
     {
         try
         {
            ifDoc = ifRef.contentDocument.documentElement;
         }
         catch(ee) { }
    }

    if( ifDoc )
     {
         ifRef.height = 1;
         ifRef.height = ifDoc.scrollHeight;

         /* For width resize, enable below.  */

         // ifRef.width = 1;
         // ifRef.width = ifDoc.scrollWidth;
     }
}