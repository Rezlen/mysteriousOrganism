

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
};
console.log(returnRandBase()) //DNA is comprised of four bases (Adenine, Thymine, Cytosine, and Guanine). When returnRandBase() is called, it will randomly select a base and return the base ('A','T','C', or 'G').

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};
console.log(mockUpStrand()) //to generate an array containing 15 bases to represent a single DNA strand with 15 bases.

//Factory function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
      },
     /* these three line below, test whather the MUTATE method works or not
      const strand = mockUpStrand();
      const pStrand = pAequorFactory(1, strand);
      console.log(pStrand.mutate());*/

   // compareDNA() compare the DNA sequences of different P. aequor. You’ll have to add a new method (.compareDNA()) to the returned object of the factory function.
    compareDNA(otherOrg) { 
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherOrg.dna[idx]) {
            return acc +1;
        } else {
          return acc;
        }
      }, 0);
        const percentOfDnaShared = (similarities / this.dna.length) * 100;
        const percentageToDeci = percentOfDnaShared.toFixed(2);
        console.log(` Specimen ${this.specimenNum} and specimen ${otherOrg.specimenNum} have ${percentageToDeci}% DNA in common.`);
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === 'C' || el === 'G')
      return cOrG.length / this.dna.length >= 6.0;
      },
    }
  }
/*How to test the factory function:
You need to invoke the method and pass in the other strand. Create two strands using the factory function. Invoke the method on one of them, and pass in the other one.
==============
//create two strands
strand1 = mockUpStrand()
strand2 = mockUpStrand()

//Now pass each to the factory and assign the returns to two variables.
variable1 = pAequorFactory(1, strand1)
variable2 = pAequorFactory(2, strand2)

//Next call the compare method on one with the other as argument.
variable1.compareDNA(variable2);

Output:    1 and 2 have 20% DNA in common.
 */
const survivingSpecimen = []
let idCounter = 1;
  while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
    }
    idCounter++;
}

console.log(survivingSpecimen());

 
