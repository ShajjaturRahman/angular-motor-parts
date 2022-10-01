import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  counter: number = 0
  imgUrls = [
    "assets/images/slider-1.png",
    "assets/images/slider-2.png",
  ]
  sliderImgLink: string = ""

  constructor() { }

  ngOnInit(): void {
    this.sliderImgLink = this.imgUrls[0]

    setInterval(() => {
      this.counter = (this.counter + 1) % this.imgUrls.length
      this.sliderImgLink = this.imgUrls[this.counter]
    }, 5000)
  }

}
