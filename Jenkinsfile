pipeline {
   agent any
    //   environment {
    //      PATH='/usr/local/bin:/usr/bin:/bin'
    //   }
   stages {
      stage('NPM Setup') {
      steps {
         bat 'npm install'
      }
   }
    stage('Integration tests') {
   steps {
      bat 'ng test'
   }
  }

   stage('Android Build') {
   steps {
      bat 'ionic cordova build android --release'
   }
  }



   stage('Stage Web Build') {
      steps {
        bat 'npm run build --prod'
    }
  }

//    stage('Publish Firebase Web') {
//       steps {
//       sh 'firebase deploy --token "Your Token Key"'
//    }
//   }

//    stage('Publish iOS') {
//       steps {
//        echo "Publish iOS Action"
//     }
//    }

   stage('Publish Android') {
     steps {
    echo "Publish Android API Action"
   }
  }

 }
}