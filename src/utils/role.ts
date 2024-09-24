export enum role {
  EMPRESARIO = 'Empresário',
  EMPREENDEDOR = 'Empreendedor',
  ALUNO = 'Aluno',
  INVESTIDOR = 'Investidor',
  MENTOR = 'Mentor',
  VISITANTE = 'Visitante',
  ADMIN = 'Admin',
  GESTOR = 'Gestor'
}


export function RoleChecker(roles:string){
  if(roles === 'Empresário'){
    return role.EMPRESARIO
  }else if(roles === 'Investidor'){
    return role.INVESTIDOR
  }else if(roles === 'Empreendedor'){
    return role.EMPREENDEDOR
  }else if(roles === 'Aluno'){
    return role.ALUNO
  }else if(roles === 'Mentor'){
    return role.MENTOR
  }else if(roles === 'Gestor') {
    return role.GESTOR
  }else if(roles === 'Admin'){
    return role.ADMIN
  } else {
    return role.VISITANTE
  }
}