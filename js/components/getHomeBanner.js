import { baseUrl } from "../data/api.js";
const homeBannerContainer = document.querySelector(".hero__banner")

export async function getHomeBanner() {

  if(homeBannerContainer){
    const reviewUrl = baseUrl + `home-banner?populate=*`;
  
    try {
      const response = await fetch(reviewUrl);
      const details = await response.json();
      const heroBannerBaseUrl = details.data.attributes.Hero_banner.data
      const heroBannerAltText = details.data.attributes.Hero_banner_alt_text

      heroBannerBaseUrl.forEach(bannerImage => {
  
        homeBannerContainer.innerHTML = `
        <div class="home__banner--image" aria-label="${heroBannerAltText}" style="background-image: url('${bannerImage.attributes.url}');")>
          <div></div>
          <div class="home__banner--text">
          <h2 class="text-white bg-primary" >Let's Scale Up Your Business</h2>
            <h1 class="text-white bg-primary" >Unlimited Marketing</h1>
  
          </div>
        </div>`
      });
  
    } catch (error) {
      console.log(error)
    }
  }
}

