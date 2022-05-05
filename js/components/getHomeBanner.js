import { baseUrl } from "../data/api.js";
const homeBannerContainer = document.querySelector(".home__banner")

export async function getHomeBanner() {

  if(homeBannerContainer){
    const reviewUrl = baseUrl + `home-banner?populate=*`;
  
    try {
      const response = await fetch(reviewUrl);
      const details = await response.json();
      const homeBannerBaseUrl = details.data.attributes.Hero_banner.data
  
      homeBannerBaseUrl.forEach(bannerImage => {
  
        homeBannerContainer.innerHTML = `
        <div class="home__banner--image" style="background-image: url('${bannerImage.attributes.url}');")>
          <div></div>
          <div class="home__banner--text">
          <h2 style="text-align:center">Let's Scale Up Your Business</h2>
            <h1>Unlimited Marketing</h1>
  
          </div>
        </div>`
      });
  
    } catch (error) {
      console.log(error)
  
    }
  }
}

