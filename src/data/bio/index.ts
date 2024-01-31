export async function getBioData() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  return {
    content: `The Beatles were an English rock band, 
      formed in Liverpool in 1960, that comprised 
      John Lennon, Paul McCartney, George Harrison 
      and Ringo Starr.`,
  };
}
