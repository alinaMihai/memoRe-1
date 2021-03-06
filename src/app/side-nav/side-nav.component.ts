import { Component,
 OnInit,
  OnChanges,
   Input,
   SimpleChanges,
   ViewChild,
   EventEmitter
} from '@angular/core';

import { Router} from '@angular/router';
import { MdSidenav } from '@angular/material';

import { TagsService } from '../shared/tags.service';

@Component({
  selector: 'memore-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
	@Input() isOpen: boolean;
	@ViewChild('sidenav') sidenav: MdSidenav;
  allTags;
  searchThings;
  noTag = { id: 0, name: 'Untagged', checked: false};
  private filterBy: number[] = [];
  
  constructor(private tagsService: TagsService,
   private router: Router) { }

  ngOnInit() {
    const selectedTags = localStorage.getItem('tags');
    this.filterBy = selectedTags ? selectedTags.split(',').map(Number) : [];
     this.tagsService.getAllTags().subscribe(allTags => {
          this.allTags = allTags.map(aTag => {
              aTag.checked = this.filterBy ? 
                this.filterBy.indexOf(aTag.id) !== -1 :
                 false;
              return aTag;
            });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
	  if (changes['isOpen']) {
		  this.openSidenav();
     }
  }

  openSidenav() {
	  this.sidenav.toggle();
  }

  addFilter(event, tag) {
      if (event.checked) {
        this.filterBy = this.filterBy.concat([tag.id]);
      }
      else {
        this.filterBy = this.filterBy.filter(tagId => tagId !== tag.id); 
      }
      localStorage.setItem('tags', this.filterBy.join(','));
      this.router.navigate(['/things'], { queryParams: { tags: this.filterBy.join(',') } });
  }

  doThingsSearch() {
    this.router.navigate(['/things'], { 
       queryParams: { 
         tags: this.filterBy.join(','), 
         search: this.searchThings 
       } 
     });
  }

}
