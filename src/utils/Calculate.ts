import { Numbers } from "../Domain/Model/Raffle"

export const calculeNumbers = (total:number, numbers:Numbers[], id:string) => {
    let newNumbers: Numbers[] = []
    for (var i = 1; i <= total; i++) {
      newNumbers.push({ number: i, free: true, id: '', raffle_id: id })
    }

    if (numbers) {
      if (numbers.length > 0) {
        for (var i = 0; i <= numbers.length; i++) {
          let index = newNumbers.findIndex(item => item.number === numbers[i]?.number)
          newNumbers[index] = numbers[i]
        }
      }
    }

    return newNumbers;
  }