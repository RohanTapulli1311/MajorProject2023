// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Accounts {
    
  address private owner;
  mapping (address => account) private accounts;
  address[] private verifiers;
  address[] private cVerifiers;
  uint public dcount;
  Document[] private documents;
  Certificate[] private certificates;
  mapping (address => Count) private counts;
  mapping (address => certCount) private certcounts;

  enum AccountType {Verifier, Applicant, CVerifier}
  struct account 
  {
    string name;
    string email;
    string logo;
    string description;
    AccountType aType;
    string[] skills;
    uint flag;
    //uint verificationPrice;
  }
  enum DocStatus {Pending, Verified, Rejected}
  enum CertStatus {Pending, Verified, Rejected}

    struct Certificate{
    address requester;
    string certHash;
    string certName;
    string certDescription;
    CertStatus status;
  }

  struct Document{
    address requester;
    string docHash;
    string documentName;
    string documentDescription;
    DocStatus status;
  }
    struct Count {
    uint verified;
    uint rejected;
    uint total;
  }

      struct certCount {
    uint verified;
    uint rejected;
    uint total;
  }
 event DocumentAdded (address user);
 event CertificateAdded (address user);
 // continue from here!!

  modifier addVerifier(AccountType _aType)
  {
      _;
      if(_aType == AccountType.Verifier){
        bool found = false;
        for (uint i=0; i<verifiers.length; i++) {
          if (msg.sender == verifiers[i]) {
              found = true;
              break; 
          }
        }
        if(!found){
            verifiers.push(msg.sender);   
        }
    }
  }

    modifier addCertVerifier(AccountType _aType)
  {
      _;
      if(_aType == AccountType.CVerifier){
        bool found = false;
        for (uint i=0; i<cVerifiers.length; i++) {
          if (msg.sender == cVerifiers[i]) {
              found = true;
              break; 
          }
        }
        if(!found){
            cVerifiers.push(msg.sender);   
        }
    }
  }

  modifier isApplicant(address acc){
    require(accounts[acc].aType == AccountType.Applicant);
    _;
  }
  modifier isVerifier(address acc){
    require(accounts[acc].aType == AccountType.Verifier);
    _;
  }
    modifier isCVerifier(address acc){
    require(accounts[acc].aType == AccountType.CVerifier);
    _;
  }

event Registered (address user);
  constructor()  
  {
    owner = msg.sender;
  }
  event DocumentVerified (address user);
  event CertificateVerified (address user);
  function register(string memory _name, string memory _email, string memory _logo, string memory _description, AccountType _aType)  
  public 
  addVerifier(_aType)
  addCertVerifier(_aType)
  {
    require(accounts[msg.sender].flag!=1);
    emit Registered(msg.sender);
    string[] memory test;
        accounts[msg.sender] = account({
      name: _name, 
      email: _email, 
      logo: _logo, 
      description: _description,
      aType: _aType,
      flag:1,
      skills: test
      //verificationPrice: price
    });
  }

  function getAccount() 
  public 
  view 
  returns (string memory name, string memory email, string memory logo, string memory description, AccountType aType, uint flag, string[] memory skill) 
  {
    name = accounts[msg.sender].name;
    email = accounts[msg.sender].email;
    logo = accounts[msg.sender].logo;
    description = accounts[msg.sender].description;
    aType = accounts[msg.sender].aType;
    flag = accounts[msg.sender].flag;
    skill = accounts[msg.sender].skills;
    return (name, email, logo, description, aType, flag, skill);
  }

  function verifiersCount() 
  public 
  view 
  returns (uint total) {
      return verifiers.length;
  }

  function cverifiersCount() 
  public 
  view 
  returns (uint total) {
      return cVerifiers.length;
  }

  function getVerifier(uint pIndex)
  public 
  view
  returns (address verifier, string memory name, string memory email, string memory logo, string memory description, AccountType aType) 
  {
    address verifierAddr = verifiers[pIndex];
    name = accounts[verifierAddr].name;
    email = accounts[verifierAddr].email;
    logo = accounts[verifierAddr].logo;
    description = accounts[verifierAddr].description;
    aType = accounts[verifierAddr].aType;
    return (verifierAddr, name, email, logo, description, aType);
  }

  modifier docAddressExists(string memory _docAddress) 
  {
    bool found = false;
    for (uint i=0; i<documents.length; i++) {
      if (keccak256(abi.encodePacked(documents[i].docHash)) == keccak256(abi.encodePacked(_docAddress))) {
          found = true;
          break; 
      }
    }
    require(!found);
    _;
  }

    modifier certAddressExists(string memory _certAddress) 
  {
    bool found = false;
    for (uint i=0; i<certificates.length; i++) {
      if (keccak256(abi.encodePacked(certificates[i].certHash)) == keccak256(abi.encodePacked(_certAddress))) {
          found = true;
          break; 
      }
    }
    require(!found);
    _;
  }

  function addDocument(string memory _name, string memory _description, string memory _docAddress) 
  public 
  docAddressExists(_docAddress)
  isApplicant(msg.sender)
  {
    emit DocumentAdded(msg.sender);
    
    documents.push(
      Document({
        documentName: _name,
        requester: msg.sender,
        documentDescription: _description,
        docHash: _docAddress,
        status: DocStatus.Pending
      })
    );
    
    counts[msg.sender].total = counts[msg.sender].total + 1;
  }

    function addCertificate(string memory _name, string memory _description, string memory _certAddress) 
  public 
  docAddressExists(_certAddress)
  isApplicant(msg.sender)
  {
    emit CertificateAdded(msg.sender);
    
    certificates.push(
      Certificate({
        certName: _name,
        requester: msg.sender,
        certDescription: _description,
        certHash: _certAddress,
        status: CertStatus.Pending
      })
    );
    
    certcounts[msg.sender].total = certcounts[msg.sender].total + 1;
  }
//

  function getRequesterDocuments()
  public 
  view 
  isApplicant(msg.sender)
 returns(string[] memory, string[] memory, string[] memory, DocStatus[] memory, uint[] memory){
       string[] memory name = new string[](documents.length);
       string[] memory description = new string[](documents.length);
       string[] memory docHash = new string[](documents.length);
       DocStatus[] memory status = new DocStatus[](documents.length);
      uint[]  memory index = new uint[](documents.length);
      uint countvd = 0;
       for(uint i=0;i<documents.length;i++){
        if(documents[i].requester == msg.sender){
        name[countvd] = documents[i].documentName;
        description[countvd] = documents[i].documentDescription;
        docHash[countvd] = documents[i].docHash;
        status[countvd] = documents[i].status;
        index[countvd] = i;
        countvd+=1;
      }
       }
       return (name,description, docHash, status,index);
    }


  function getRequesterCertificates()
  public 
  view 
  isApplicant(msg.sender)
 returns(string[] memory, string[] memory, string[] memory, CertStatus[] memory, uint[] memory){
       string[] memory name = new string[](certificates.length);
       string[] memory description = new string[](certificates.length);
       string[] memory certHash = new string[](certificates.length);
       CertStatus[] memory status = new CertStatus[](certificates.length);
      uint[]  memory index = new uint[](certificates.length);
      uint countvd = 0;
       for(uint i=0;i<certificates.length;i++){
        if(certificates[i].requester == msg.sender){
        name[countvd] = certificates[i].certName;
        description[countvd] = certificates[i].certDescription;
        certHash[countvd] = certificates[i].certHash;
        status[countvd] = certificates[i].status;
        index[countvd] = i;
        countvd+=1;
      }
       }
       return (name,description, certHash, status,index);
    }

    //

  function getDocument(string memory docAddress) 
  public 
  view 
  returns (string memory name, address requester, string memory description, DocStatus status) {
    for (uint i=0; i<documents.length; i++) {
      if(keccak256(abi.encodePacked(documents[i].docHash))== keccak256(abi.encodePacked(docAddress))){
        requester = documents[i].requester;
        name = documents[i].documentName;
        description = documents[i].documentDescription;
        status = documents[i].status;
        break;
      }
    }
    return (name, requester, description, status);
  }
  
    function getCertificate(string memory certAddress) 
  public 
  view 
  returns (string memory name, address requester, string memory description, CertStatus status) {
    for (uint i=0; i<certificates.length; i++) {
      if(keccak256(abi.encodePacked(certificates[i].certHash))== keccak256(abi.encodePacked(certAddress))){
        requester = certificates[i].requester;
        name = certificates[i].certName;
        description = certificates[i].certDescription;
        status = certificates[i].status;
        break;
      }
    }
    return (name, requester, description, status);
  }
 

  function getVerifierDocuments() public view isVerifier(msg.sender) returns(string[] memory, string[] memory, string[] memory, DocStatus[] memory, uint[] memory){
       string[] memory name = new string[](documents.length);
       string[] memory description = new string[](documents.length);
       string[] memory docHash = new string[](documents.length);
       DocStatus[] memory status = new DocStatus[](documents.length);
      uint[]  memory index = new uint[](documents.length);
      uint countvd = 0;
       for(uint i=0;i<documents.length;i++){
        if(documents[i].status == DocStatus.Pending){
        name[countvd] = documents[i].documentName;
        description[countvd] = documents[i].documentDescription;
        docHash[countvd] = documents[i].docHash;
        status[countvd] = documents[i].status;
        index[countvd] = i;
        countvd+=1;
      }
       }
       return (name,description, docHash, status,index);
    }


      function getCVerifierCertificates() public view isCVerifier(msg.sender) returns(string[] memory, string[] memory, string[] memory, CertStatus[] memory, uint[] memory){
       string[] memory name = new string[](certificates.length);
       string[] memory description = new string[](certificates.length);
       string[] memory certHash = new string[](certificates.length);
       CertStatus[] memory status = new CertStatus[](certificates.length);
      uint[]  memory index = new uint[](certificates.length);
      uint countvd = 0;
       for(uint i=0;i<certificates.length;i++){
        if(certificates[i].status == CertStatus.Pending){
        name[countvd] = certificates[i].certName;
        description[countvd] = certificates[i].certDescription;
        certHash[countvd] = certificates[i].certHash;
        status[countvd] = certificates[i].status;
        index[countvd] = i;
        countvd+=1;
      }
       }
       return (name,description, certHash, status,index);
    }

      function getVerifierDocumentCount() public view isVerifier(msg.sender) returns(uint){
        uint count=0;
       for(uint i=0;i<documents.length;i++){
        if(documents[i].status == DocStatus.Pending){
        count+=1;
      }
       }
       return (count);
    }

      function getCVerifierCertCount() public view isCVerifier(msg.sender) returns(uint){
        uint count=0;
       for(uint i=0;i<certificates.length;i++){
        if(certificates[i].status == CertStatus.Pending){
        count+=1;
      }
       }
       return (count);
    }  

  function verifyDocument(string memory docAddress, DocStatus status) 
  public 
  isVerifier(msg.sender)
  {
    for (uint i=0; i<documents.length; i++) {
      if((keccak256(abi.encodePacked(documents[i].docHash))== keccak256(abi.encodePacked(docAddress))) && documents[i].status == DocStatus.Pending){
        emit DocumentVerified(msg.sender);
        if(status == DocStatus.Rejected){
            counts[documents[i].requester].rejected = counts[documents[i].requester].rejected + 1;
        }
        if(status == DocStatus.Verified){
            counts[documents[i].requester].verified = counts[documents[i].requester].verified + 1;
        }
        documents[i].status = status;
        break;
      }
    }
  }

  function verifyCertificate(string memory certAddress, CertStatus status) 
  public 
  isCVerifier(msg.sender)
  {
    for (uint i=0; i<certificates.length; i++) {
      if((keccak256(abi.encodePacked(certificates[i].certHash))== keccak256(abi.encodePacked(certAddress))) && certificates[i].status == CertStatus.Pending){
        emit CertificateVerified(msg.sender);
        if(status == CertStatus.Rejected){
            certcounts[certificates[i].requester].rejected = certcounts[certificates[i].requester].rejected + 1;
        }
        if(status == CertStatus.Verified){
            certcounts[certificates[i].requester].verified = certcounts[certificates[i].requester].verified + 1;
            accounts[certificates[i].requester].skills.push(certificates[i].certName);
        }
        certificates[i].status = status;
        break;
      }
    }
  }

  function showSkills() public view isApplicant(msg.sender) returns(string[] memory){
      return accounts[msg.sender].skills;
  }

  function getCounts (address acc) 
  public 
  view
  returns(uint verified, uint rejected, uint total) 
  {
    return (counts[acc].verified, counts[acc].rejected, counts[acc].total);
  }

  function getcertCounts (address acc) 
  public 
  view
  returns(uint verified, uint rejected, uint total) 
  {
    return (certcounts[acc].verified, certcounts[acc].rejected, certcounts[acc].total);
  }
  



  

}