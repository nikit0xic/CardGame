import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rooms-info',
  templateUrl: './rooms-info.component.html',
  styleUrls: ['./rooms-info.component.css']
})
export class RoomsInfoComponent implements OnInit{

  userToken: any;
  temporaryForMessInfo: any;

  userTokenFc = new FormControl('',[Validators.required]);
  roomCodeFc = new FormControl('',[Validators.required]);

  fg = new FormGroup({
    login: this.userTokenFc,
    password: this.roomCodeFc
  });

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'roomCode',
    'adminLogin',
    'passwordFromRoom',
    'playersInRoom',
    'buttonToJoin',
  ];

  temporaryPlayersOnline: any;

  displayedColumnsPlayersOnline: string[] = [
    'playerLogin',

  ];

  playersOnlineDataSource: any[] = [];

  displayedPlayersRooms: any[] = [
    'room_code'
  ];

  playerRoomsDataSource: any[] = [];

  constructor(private api:ApiService, private router: Router) { //Здесь можно инджектить компоненты
  }

  onSubmit(){
    this.userToken=JSON.parse(localStorage.getItem('userToken') || '');
    //this.api.joinRoom(this.userToken,roomCode,'NULL');
    //this.router.navigate(['gameTable']);
  }

  ngOnInit() {
    this.temporaryForMessInfo = JSON.parse(localStorage.getItem('messOfInfoResponse') || '');
    let roomData = this.temporaryForMessInfo[2];
    roomData['Логин_админа'].forEach((data: any, index: any) => { //Прошлись по колонке логин админа
      let roomInfo: any = {} //Чтобы собрать строку из колонок
      roomInfo.adminLogin = data
      roomInfo.roomCode = roomData['Код_комнаты'][index]
      roomInfo.passwordFromRoom = roomData['Пароль_от_комнаты'][index]
      roomInfo.playersInRoom = roomData['Игроков_в_комнате'][index]
      this.dataSource.push(roomInfo);
    })

    let playersRoomData = this.temporaryForMessInfo[3];
    playersRoomData['Комнаты в которых вы состоите'].forEach((data: any) =>{
      let playerRoomsInfo: any = {}
      playerRoomsInfo.roomCode=data;
      this.playerRoomsDataSource.push(playerRoomsInfo);
    })


    let playersOnlineData = this.temporaryForMessInfo[1];
    playersOnlineData['Логин'].forEach((data: any, index: any) => {
      let onlinePlayersInfo: any = {}
      onlinePlayersInfo.playerLogin = data;
      //onlinePlayersInfo.lastTimeOnline = onlinePlayersInfo['Последнее_время_онлайн'][index];
      this.playersOnlineDataSource.push(onlinePlayersInfo);
    })

  }
}
