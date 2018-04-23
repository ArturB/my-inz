import { NgModule } from '@angular/core'; // import dekoratora używanego niżej
import { BrowserModule } from '@angular/platform-browser'; //daje niezbędny minimum dyrektyw i funkcjonalności umożliwiający pracę z html kodem 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AcVideoModule } from './after-log/account-videos/acvideo.module';
import { AfterLogModule } from './after-log/after-log.module';
import { NotfoundComponent } from './notfound/notfound.component';

import { SofModule } from './after-log/shared/sof.module';

//dekorator NgModule potrzbny żeby określić że to nie zwykła klasa tylko moduł
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    AcVideoModule,
    AfterLogModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent] //wskazujemy tu root komponent, z którego zaczyna się nasza apka
})
export class AppModule { }
