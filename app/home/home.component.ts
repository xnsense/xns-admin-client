import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { XnsService } from '../api/xns.service';

@Component({
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['app/home/home.component.css']
})
export class HomeComponent implements OnInit {
    public pageTitle: string = 'Home';
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: XnsService) 
        { }
    ngOnInit() 
    {
        if(!this._service.isLoggedIn())
        {
            document.querySelector('body').classList.remove('sidebar-fixed');
            document.querySelector('body').classList.add('sidebar-hidden');
        }else
        {
            document.getElementById('loginBtn').classList.add('hidden');
            document.getElementById('sidebarBtn').classList.remove('hidden');
        }
    }
}
