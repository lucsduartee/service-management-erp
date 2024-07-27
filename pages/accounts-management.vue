<template>
  <div>
    <h1 class="mb-10">Gerenciador de usuários</h1>
    <tabs />
    <v-divider class="my-10" />
    <accounts-registration-form v-show="selectedTab === 'createAccount'"/>
    <accounts-table v-show="selectedTab === 'listAccount'" />
  </div>
</template>