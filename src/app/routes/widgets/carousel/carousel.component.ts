
import { Component, OnInit, Inject } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CarouselService } from "./service/carousel.service";


@Component({
  selector: 'app-carousel',
  styles: [
    `
      nz-radio-group {
        margin-bottom: 8px;
      }

      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h1 {
        color: #fff;
        margin-bottom: 0;
        user-select: none;
      }
    `
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {
  listContent = new Array();
  images = true;
  dotPosition = 'top'; //posible options: buttom, rigth, left

  array = [1, 2, 3, 4];
  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private carouselService: CarouselService) {

  }

  ngOnInit(): void {
    this.getCarouselContent();
  }

  getCarouselContent() {
    this.images = true;
    const tokenData = this.tokenService.get();
    let genericRequest = {}

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };

      this.carouselService._getCarouselContent(genericRequest).subscribe((data) => {
        debugger;
        this.listContent = JSON.parse(data);

        if (this.listContent.length == 0) {
          this.images = false;
          this.listContent = ["SIN RESULTADOS"];
        }

      });
    } else {

    }
  }

  changeDotPosition(pos: string) {
    this.dotPosition = pos;
  }
}
