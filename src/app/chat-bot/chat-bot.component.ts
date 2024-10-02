import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';



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
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements AfterViewInit {




  userInput: string = "Hello"
  answer: string = ""
  answersList: string[] = [];
  questionsList: string[] = [];
  bloqueQA: BloqueQA[] = [];
  isLoading: boolean = false


  personalInformation: PersonalInformation = {
    name: 'Sebastian Osorio Alcaraz',
    age: '28',
    maritalStatus: 'Single',
    email: 'osorioalcaraz@hotmail.com'
  }

  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;
  @ViewChild('divQA', { static: false }) divQA!: ElementRef;


  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.searchbar) {
        this.searchbar.setFocus();
      } else {
        console.error('searchbar is undefined');
      }
    }, 300);


    setTimeout(() => {
      this.handleUserInput();
    }, 500)
  }


  responses: { [key: string]: { regex: RegExp; response: string } } = {
    greetings: {
      regex: /\b(hello|hi|hey|hola|greetings|buenos días|buenas tardes|buenas noches)\b/i,
      response: "🙋🏼‍♂️ Hello!👋 It's great to meet you 😀. What do you want to know about me?"
    },
    smallTalk: {
      regex: /\b(how are|what's up|how's it going|que tal|cómo estás§|vas)\b/i,
      response: "I'm doing well 👍, thank you for asking! 🙏🏼 I hope you're having a great day. How can I help you?"
    },
    nameQuery: {
      regex: /\b(name|nombre|llamas|who|who are you)\b/i,
      response: "🏃🏼‍♂️‍➡️ My name is Sebastian Osorio Alcaraz 🙋. It's a pleasure to introduce myself!"
    },
    contactInfo: {
      regex: /\b(contact|email|phone|teléfono|correo)\b/i,
      response: "🤵 You can reach me via email at osorioalcaraz@hotmail.com or by phone  at  📞 +573235522868 📞. I'm always happy to connect! 🫱🏻‍🫲🏼"
    },
    professionalSummary: {
      regex: /\b(summary|about you|yourself|background|profile|present|about)\b/i,
      response: "🫡 I'm a 🔋proactive🔋and detail-oriented frontend developer 👁 with 5 years of experience building responsive web applications 🔰.👱🏼‍♂️ I specialize in HTML, CSS, JavaScript, TypeScript, Angular, and React. I'm skilled in creating user-friendly interfaces and optimizing web performance. 💡 I'm particularly passionate about developing📲 responsive PWAs 📲 and more..."
    },
    technicalSkills: {
      regex: /\b(skills|technical|competencies|habilidades|dedicas)\b/i,
      response: "🧑‍💻 My technical skills include: 🧩 🥷🏼Frameworks/Libraries: React, Angular, Ionic, Node.js, Bootstrap, Socket.IQ. Languages: JavaScript, TypeScript, HTML5, CSS3. Tools: Git, Webpack, npm, Visual Studio Code. Preprocessors: Sass. Other skills: CI/CD, UX Design, Accessibility (WCAG), Agile/Scrum, Performance Optimization."
    },
    experience: {
      regex: /\b(experience|work history|jobs|trabajos|experiencia|history)\b/i,
      response: "👨🏼‍💼💼 My most recent experiences include: 1) Frontend Developer at LinguoBoost 👔 (Remote, Feb 2024 - Current), where I create 📲 responsive interfaces 📲 and work with Angular. 2) 👨🏼‍🏫 Frontend Developer Intern at Sapiencia (Medellin, Nov 2019 - Dec 2023), where I worked on debugging and gained experience with React and Angular. 3) Multimedia Developer at Emi Group (Medellin, Jun 2017 - Aug 2018), where I created and maintained websites with a focus on user-friendly layouts."
    },
    education: {
      regex: /\b(education|degree|studies|estudios)\b/i,
      response: "👨🏼‍🎓I hold a Master's 👨🏼‍💼 in Multimedia Design and Production 🎓📚 from Universidad Internacional de la Rioja (Spain) and 👨🏼‍🎓 a Bachelor's  in Audiovisual Languages 🎓 from Universidad de Medellin. I also have certifications in Front End Development Libraries from FreeCodeCamp and I'm a Google Mobile Web Specialist."
    },
    languages: {
      regex: /\b(languages|idiomas|idioma|speak|english|ingles|spanish)\b/i,
      response: "🌏🗣 I'm fluent in multiple languages:  🗽 English (C1 level, EF SET Certified), French (B1 level), and Spanish (Native speaker)."
    },
    portfolio: {
      regex: /\b(portfolio|projects|trabajos|project|job|work)\b/i,
      response: "💁🏼‍♂️ You can check out my portfolio at the Projects Section. It showcases some of my best work and demonstrates my skills in frontend development."
    },
    strengths: {
      regex: /\b(strengths|fortalezas|strong points)\b/i,
      response: "🧗🏼‍♂️ My key strengths include attention to detail 🧏🏼‍♀️, proactive problem-solving, ability to create user-friendly interfaces, and a passion for 🚀 optimizing  🚀 web performance. I'm also highly adaptable and always eager to learn new technologies."
    },
    biggestAchievement: {
      regex: /\b(achievement|accomplishment|logro|logros|éxito)\b/i,
      response: "🎯One of my proudest accomplishments 🏆🥇 was optimizing a web application's load time by 40% 📈, significantly improving user experience and engagement metrics. This project really showcased my skills in performance optimization and had a tangible impact on the business."
    },
    whyHire: {
      regex: /\b(hire|stand out|unique|contratar)\b/i,
      response: "🛸👨🏼‍💼 You should consider hiring me👨🏼‍💼 🛸 because of my proven track record  in creating 🔹 responsive and performant web applications 🔹. My combination of technical skills, attention to user experience, and passion for continuous learning allows me to deliver high-quality frontend solutions that meet both user needs and business objectives. I'm also a great team player with excellent communication skills."
    },
    age: {
      regex: /\b(age|edad|old)\b/i,
      response: "I'm 28 years old 🚀, i combine youthful passion  ⚡️⚡️ with expertise. "
    },
    affirmation: {
      regex: /\b(great|good|nice)\b/i,
      response: "💁Would you like to know more about me 👨🏼‍🦱?, my education, skills, experience...👀"
    },
    more: {
      regex: /\b(yes|ofcourse|si|ok)\b/i,
      response: " 💎  I am  ❤️‍🔥 passionated ❤️‍🔥  about  🔹 user interaction 🔹 and problem solving 🧠, i started on this because my father is a Backend Developer so i wanted to help him on his proyects. Let's get in contact +57 3235522868"
    },
    location: {
      regex: /\b(city|location|live|located|vives|ciudad|country|where)\b/i,
      response: "🗺 I live in Medellín - Colombia ☕️🦜 right now,  with some interest on relocate ✈️"
    },
    defaultResponse: {
      regex: /.*/,
      response: "🤷🏼‍♂️ I didn't quite understand your question. Could you please rephrase it or ask about a specific aspect of my background or skills?"
    }
  };


  handleUserInput() {
    if (this.userInput.trim() !== '') {
      this.isLoading = true;
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
      this.searchbar.setFocus();
      this.loadedMessage()
      this.scrollToBottom()

    }
  }

  loadedMessage() {
    setTimeout(() => {
      this.isLoading = false;
      this.playSound();
    }, 1000);
  }

  scrollToBottom() {
    try {
      this.divQA.nativeElement.scrollTop = this.divQA.nativeElement.scrollHeight;
    } catch (err) { }
  }

  public chips:string[] = ["What's your Experience?", 'Skills', 'Where do you live?'];


  setPrompt(chip:string){
    this.userInput = chip;
    this.handleUserInput()
  }

  playSound() {
    if (this.bloqueQA.length > 2){
      const audio = new Audio();
      audio.src = "../assets/notificationSound.wav";
      audio.load();
      audio.play();
    } 
    else{
      console.log ("no debe sonar")
    }
    
    
    }
    


}

