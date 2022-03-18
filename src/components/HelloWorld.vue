<template>
  <div>
    <div class="text-center">
      <div>
        <span>Your PublicKey: {{ publicKey }}</span>
      </div>
      <div>
            
          mint address: <input v-model="mint"/>
      </div>
      <button @click="check">check</button>
      <button @click="getProvider">Connect to phantom</button>
    </div>
  </div>
</template>

<script>
import {
  Connection,
  PublicKey
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
 
 
export default {
  name: "HelloWorld",
  data: () => ({
    publicKey: "",
    mint:"",//token mint address
    amount: 0,
    rpcUrl : "https://api.devnet.solana.com",
    connection :"",
    provider:"",
     
  }),
  methods: {
     async check(){
       const token = new Token(this.connection,new PublicKey(this.mint) , TOKEN_PROGRAM_ID)
       const mintInfo =  await token.getMintInfo();
       const mintOwer = mintInfo.mintAuthority.toBase58()
       if(mintOwer == this.publicKey){
         console.log("the same")
        const tokenAccounts =  this.connection.getTokenAccountsByOwner(this.publicKey,{mint:new PublicKey(this.mint)},"singleGossip")
        console.log(tokenAccounts.value.data.parsed.info.mint)
       }else{
         console.log("sign fail")
       }
     },
  
    async getProvider() {
      if (window.solana) {
        console.log("solana is there");
        this.provider = window.solana;
        const vm = this;
        if (vm.provider.isPhantom) {
          vm.provider.on("connect", () => {
            // console.log(vm.provider.publicKey);
            vm.publicKey = vm.provider.publicKey;
          });
          vm.provider.on("disconnect", () => {
            console.log("Disconnected from wallet");
          });
          // try to eagerly connect
         vm. provider.connect(/**{ onlyIfTrusted: true }**/);
         
          return () => {
            vm.provider.disconnect();
          };
        }
      }
    }
  },
  async mounted() {
    this.connection = new Connection(this.rpcUrl, "confirmed");
    const version = await this.connection.getVersion();
    console.log("Connection to cluster established:", this.rpcUrl, version);
  }
};
</script>
