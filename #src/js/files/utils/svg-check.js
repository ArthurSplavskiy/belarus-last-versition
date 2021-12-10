function svgCheck() { 
  const svgImages = document.querySelectorAll('img[src$=".svg"]'); 
 
  svgImages.forEach(svg => { 
    const newContainer = svg.parentElement.parentElement; 
    const newSvg = svg.cloneNode(); 
    svg.parentElement.remove(); 
    newContainer.append(newSvg); 
  }); 
 } 
//svgCheck(); 
