<template>
  <div class="home">

    <div class="text-center text-h4" v-if="maxScore">{{ `Лучший результат ${maxScore} баллов` }}</div>
    <div class="container row">
      <div class="col-12">
        <h4 class="text-center">Настройки</h4>
      </div>
      <div class="col-4"></div>
      <div class="col-4">
        <q-slider
          v-model="gameTime"
          :min="1"
          :max="15"
          markers
          :step="1"
          snap
        />
        <div class="text-weight-medium">{{ `Длительность игры ${gameTime} мин.` }}</div>
      </div>
      <div class="col-4"></div>
      <div class="col-4"></div>
      <div class="col-4">
        <q-slider
          v-model="difficulty"
          :min="1"
          :max="3"
          markers
          :step="1"
          snap
        />
        <div
          class="text-weight-medium"
        >{{ `В примерах будут ${difficultyExplain[difficulty]} числа` }}
        </div>
      </div>
      <div class="col-4"></div>
      <div class="col-4"></div>
      <div class="col-4" style="margin-bottom: 30px;">
        <q-checkbox v-model="sum" label="Сложение" /><br>
        <q-checkbox v-model="sub" label="Вычитание" /><br>
        <q-checkbox v-model="multi" label="Умножение" /><br>
        <q-checkbox v-model="division" label="Деление" />
      </div>
      <div class="col-4"></div>
      <q-btn
        color="primary"
        style="margin: 0 auto;"
        label="Играть"
        size="md"
        @click="play"
        :disable="!isReadyToPlay"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Settings',
  components: {

  },
  setup() {
    const router = useRouter();
    const gameTime = ref<number>(1);
    const difficulty = ref<number>(1);
    const difficultyExplain = {
      1: 'двузначные',
      2: 'трехзначные',
      3: 'четырехзначные',
    };
    // Какие примеры
    const sum = ref<boolean>(false);
    const sub = ref<boolean>(false);
    const multi = ref<boolean>(false);
    const division = ref<boolean>(false);
    const isReadyToPlay = computed(() => sum.value || sub.value || multi.value || division.value);
    const actualActions = computed(() => {
      const result = [];
      if (sum.value) {
        result.push('sum');
      }
      if (sub.value) {
        result.push('sub');
      }
      if (multi.value) {
        result.push('multi');
      }
      if (division.value) {
        result.push('division');
      }
      return result;
    });
    const play = () => {
      router.push({ name: 'game', params: { time: gameTime.value, dif: difficulty.value, actions: actualActions.value } });
    };
    const maxScore = computed(() => {
      const rawRes = localStorage.getItem('results');
      let results: {score: number, statistic: string}[] = [];
      if (rawRes) {
        results = JSON.parse(rawRes);
        const scores = results.map(({ score }) => (score));
        return Math.max(...scores);
      }
      return 0;
    });
    return {
      gameTime,
      difficulty,
      difficultyExplain,
      sum,
      sub,
      multi,
      division,
      isReadyToPlay,
      play,
      maxScore,
    };
  },
});
</script>

<style lang="scss" scoped>
  .container{
    width: 1024px;
    margin: 0 auto;
  }
  .col-4{
    margin-bottom: 20px;
  }
</style>
