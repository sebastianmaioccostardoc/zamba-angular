
import { Component, OnInit, Inject } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CarouselService } from "./service/carousel.service";


@Component({
  selector: 'app-carousel',
  styles: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {
  config: any = [];
  listContent = new Array();
  images: boolean = true;


  dotPosition = 'top'; //posible options: buttom, rigth, left
  AutoPlaySpeed = 5000;
  AutoPlay = true;
  EnableSwipe = true;
  Loop = true;

  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private carouselService: CarouselService) {

  }

  ngOnInit(): void {
    this.getCarouselContent();
  }

  getCarouselContent() {
    this.EnableSwipe = true;
    const tokenData = this.tokenService.get();
    let genericRequest = {}

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };

      this.carouselService._getCarouselContent(genericRequest).subscribe((data) => {
        this.listContent = JSON.parse(data);

        if (this.listContent.length == 0) {
          this.EnableSwipe = false;

          //TEST:
          // this.listContent = ["SIN RESULTADOS"];
          // this.listContent.push("SIN RESULTADOS 2");
          // this.listContent.push("SIN RESULTADOS 3");
          // this.listContent.push("SIN RESULTADOS 4");
        }

      });
    }
  }
  changeDotPosition(pos: string) {
    this.dotPosition = pos;
  }

  getCarouselConfig() {

    const tokenData = this.tokenService.get();
    let genericRequest = {}

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };

      this.carouselService._getCarouselConfig(genericRequest).subscribe((data) => {
        var dataJson = JSON.parse(data);

        this.dotPosition = dataJson.dotPosition;
        this.AutoPlaySpeed = dataJson.AutoPlaySpeed;
        this.AutoPlay = dataJson.AutoPlay;
        this.EnableSwipe = dataJson.EnableSwipe;
        this.Loop = dataJson.Loop;

      });
    }
  }

}
