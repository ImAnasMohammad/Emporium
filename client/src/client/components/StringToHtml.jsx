import React from 'react'
import DOMPurify from 'dompurify';
const StringToHtml = ({htmlString}) => {
      const sanitizedHtmlString = DOMPurify.sanitize(htmlString);
      return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }} />
      );
}

export default StringToHtml