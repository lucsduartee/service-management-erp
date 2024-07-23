<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer theme="dark" permanent>
        <v-list nav>
          <v-list-item prepend-icon="mdi-email" value="inbox"
            ><NuxtLink to="/">Obras</NuxtLink></v-list-item
          >
          <v-list-item
            prepend-icon="mdi-account-supervisor-circle"
            value="supervisors"
            ><NuxtLink to="/proventos"
              >Cadastro de usuários</NuxtLink
            ></v-list-item
          >
        </v-list>
        <p>Sair</p>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>