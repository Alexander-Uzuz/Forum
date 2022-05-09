export const checkedForbiddenWords = (str:any) =>{

    const regex = /\b(?:one|two|three)\b/gi;

    function replaceForBiddenWords(subject:string, words:any) {
        function createStars(num:number) {
          let result = '';
      
          for (let i = 0; i < num; i++) {
            result += '*';
          }
      
          return result;
        }
      
        const subjectArr = subject.split(' ');
      
      
        const result = subjectArr.map(item => {
          const word = words.find((word:any) => word === item);
          if (word) {
            return createStars(word.length);
          } else {
            return item;
          }
        });
      
        return result.join(' ');
      }

    if(str.match(regex)){
        const words = str.match(regex);
        return replaceForBiddenWords(str, words)
    }else{
        return str;
    }
}

