import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit {
loading$ = this.LoaderService.loading$;
  constructor(private LoaderService: LoaderService) { }

  ngOnInit(): void {
  }
    
  addLoading() : void {
      this.LoaderService.show(); setTimeout(() => { this.LoaderService.hide(); }, 1500);
    }
}
