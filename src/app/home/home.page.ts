import { Component, ViewChild} from '@angular/core';
import { ChatBotComponent } from '../chat-bot/chat-bot.component';

interface PersonalInformation {
  name: string;
  age: string;
  maritalStatus: string;
  email: string;
}


interface BloqueQA {
  text: string;
  type: 'question' | 'answer';
}

interface ResponseObject {
  [key: string]: { regex: RegExp; response: string };
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(ChatBotComponent) chatBotComponent!: ChatBotComponent;

  constructor() {}

  ionViewDidEnter() {
    // Llama a cualquier método del componente hijo si es necesario
    if (this.chatBotComponent) {
      // Si tienes un método en el componente hijo que necesita ser llamado
      this.chatBotComponent.ngAfterViewInit();
    } else {
      console.error('chatBotComponent is undefined');
    }
  }

  userInput: string = ""
  answer: string = ""
  answersList: string[] = [];
  questionsList: string[] = [];
  bloqueQA: BloqueQA[] = [];
  isLoading: boolean = true

  personalInformation: PersonalInformation = {
    name: 'Sebastian Osorio Alcaraz',
    age: '28',
    maritalStatus: 'Single',
    email: 'osorioalcaraz@hotmail.com'
  }



  responses: { [key: string]: { regex: RegExp; response: string } } = {
    greetings: {
      regex: /(hello|hi|hey|hola)/i,
      response: "Hello! How can I assist you today?"
    },
    nameQuery: {
      regex: /(what is your name|tell me your full name|nombre|cómo te llamas|name|tu nombre|your name)/i,
      response: `My name is ${this.personalInformation.name}`
    },
    ageQuery: {
      regex: /(how old are you|what's your age|age|edad)/i,
      response: `I am ${this.personalInformation.age} years old`
    },
    experienceQuery: {
      regex: /(tell me about your experience|what experience do you have)/i,
      response: "I have experience in web development, UX/UI design, and more."
    },
    defaultResponse: {
      regex: /.*/,
      response: "I'm sorry, I didn't quite catch that. Can you please ask again?"
    }
  };



  handleUserInput() {
    this.isLoading = true;
    if (this.userInput.trim() !== '') {
      // Add user question to chatMessages
      this.bloqueQA.push({ text: this.userInput.trim(), type: 'question' });

      let matchedResponse = this.responses['defaultResponse'].response;

      for (const key in this.responses) {
        if (Object.prototype.hasOwnProperty.call(this.responses, key)) {
          const { regex, response } = this.responses[key];
          if (regex.test(this.userInput)) {
            matchedResponse = response;
            break;
          }
        }
      }

      // Add response to chatMessages
      this.bloqueQA.push({ text: matchedResponse, type: 'answer' });      
      this.userInput = '';
      this.loadedMessage()
    }
  }

  loadedMessage(){
    setTimeout(() => {
      this.isLoading = false;
    },1000);
  }

}


