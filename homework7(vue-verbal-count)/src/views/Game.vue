<template>
  <div class="game">
    <q-dialog v-model="isNotAvailableToAnswer" :persistent="true">
      <q-card class="q-pa-md" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Время вышло</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-html="`Ваш результат: ${score} баллов.<br/>Вы решили ${statistic} примеров.`"></div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            color="primary"
            style="margin: 0 auto;"
            label="На главную"
            size="md"
            @click="toSettings"
          />
          <q-btn
            color="primary"
            style="margin: 0 auto;"
            label="Заново"
            size="md"
            @click="start"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="text-h3 text-center q-ma-md">{{ `${activeExample[1]} ${activeExample[0]} ${activeExample[2]}` }}</div>
      </div>
      <div class="col-4">
        <div class="text-center text-h6" style="margin-bottom: 35px" v-html="`Счет: <br/> ${score}`"></div>
        <q-circular-progress
          :value="progress"
          size="50px"
          :thickness="0.22"
          color="purple"
          track-color="grey-3"
          class="q-ma-md"
          style="margin: 0 auto; width: 50px; display: block"
        />
        <div
          class="text-center text-h6"
          style="margin-top: 15px"
        >{{ butifyTime }}</div>
      </div>
      <div class="col-4"></div>
      <div class="col-4">
        <q-input
          v-model.number="answer"
          label="Ответ"
          mask="##########"
          :error="!isAnswerCorrect"
          @keyup.enter="checkAnswer"
        />
        <div class="flex justify-around">
          <q-btn
            color="primary"
            style="margin: 0 auto;"
            label="Пропустить"
            size="md"
            @click="mainGenerator"
          />
          <q-btn
            color="primary"
            style="margin: 0 auto;"
            label="Ответить"
            size="md"
            @click="checkAnswer"
          />
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, onMounted, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Game',
  components: {

  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const { params } = route;

    const baseSeconds = ref<number>(0);
    const seconds = ref<number>(0);

    const activeExample = ref<(string | number)[]>([]);

    const answer = ref<number | string>();

    const generateRandom = (min: number, max :number) => Math.round((max - min) * Math.random() + min);
    const generateNumber = () => {
      switch (params.dif) {
        case '2':
          return generateRandom(100, 999);

        case '3':
          return generateRandom(1000, 9999);

        default:
          return generateRandom(10, 99);
      }
    };
    const generateSum = () => {
      const first = generateNumber();
      const second = generateNumber();
      const result = first + second;
      return ['+', first, second, result];
    };
    const generateSub = () => {
      const first = generateNumber();
      const second = generateNumber();
      let result: number;
      // чтобы ответ не был отрицательным значением
      if (first < second) {
        result = second - first;
        return ['-', second, first, result];
      }
      result = first - second;
      return ['-', first, second, result];
    };
    const generateMulti = () => {
      const first = generateNumber();
      const second = generateNumber();
      const result = first * second;
      return ['*', first, second, result];
    };
    const generateDiv = () => {
      let intervals;

      if (params.dif === '1') {
        intervals = [2, 9];
      } else if (params.dif === '2') {
        intervals = [10, 19];
      } else {
        intervals = [20, 99];
      }

      const second = generateRandom(intervals[0], intervals[1]);
      const result = generateRandom(intervals[0], intervals[1]);
      const first = second * result;
      return ['/', first, second, result];
    };

    const mainGenerator = () => {
      if (params.actions) {
        const index = generateRandom(0, params.actions.length - 1);
        switch (params.actions[index]) {
          case 'sub':
            activeExample.value = generateSub();
            break;
          case 'multi':
            activeExample.value = generateMulti();
            break;
          case 'division':
            activeExample.value = generateDiv();
            break;
          default:
            activeExample.value = generateSum();
        }
      } else {
        router.push({ name: 'settings' });
      }
    };

    const timer = ref<number | undefined>(undefined);

    const progress = computed(() => (seconds.value / baseSeconds.value) * 100);

    const isNotAvailableToAnswer = ref<boolean>(false);

    const statistic = ref<number>(0);

    const score = ref<number>(0);

    const timerTick = () => {
      if (seconds.value - 1 === 0) {
        clearInterval(timer.value);
        const rawRes = localStorage.getItem('results');
        let prevResults = [];
        if (rawRes) {
          prevResults = JSON.parse(rawRes);
        }
        const newRes = { score: score.value, statistic: statistic.value };
        prevResults.push(newRes);
        localStorage.setItem('results', JSON.stringify(prevResults));
        isNotAvailableToAnswer.value = true;
      } else {
        seconds.value -= 1;
      }
    };

    const isAnswerCorrect = ref<boolean>(true);

    const checkAnswer = () => {
      let el: number;
      if (activeExample.value[0] === '+' || activeExample.value[0] === '-') {
        el = 10;
      } else if (activeExample.value[0] === '*') {
        el = 20;
      } else {
        el = 30;
      }
      const examplePrice = el * Number(params.dif);
      if (answer.value === activeExample.value[3]) {
        statistic.value += 1;
        score.value += examplePrice;
        answer.value = '';
        mainGenerator();
      } else {
        isAnswerCorrect.value = false;
      }
    };

    const butifyTime = computed(() => {
      function strPadLeft(string: string, pad: string, length: number) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
      }
      return `${strPadLeft(Math.floor(seconds.value / 60).toString(), '0', 2)}:${strPadLeft((seconds.value % 60).toString(), '0', 2)}`;
    });

    const toSettings = () => {
      router.push({ name: 'settings' });
    };

    const start = () => {
      statistic.value = 0;
      score.value = 0;
      isNotAvailableToAnswer.value = false;
      mainGenerator();
      baseSeconds.value = Number(params.time) * 60;
      seconds.value = baseSeconds.value;
      timer.value = setInterval(timerTick, 1000);
    };

    onMounted(() => {
      start();
    });

    watch(
      () => answer.value,
      () => {
        if (!isAnswerCorrect.value) {
          isAnswerCorrect.value = true;
        }
      },
    );
    return {
      params,
      activeExample,
      mainGenerator,
      seconds,
      progress,
      butifyTime,
      answer,
      isAnswerCorrect,
      checkAnswer,
      score,
      isNotAvailableToAnswer,
      statistic,
      toSettings,
      start,
    };
  },
});
</script>
