import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy] = useState(1000);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [clickPower] = useState(10);
  const [isClicking, setIsClicking] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [activeTab, setActiveTab] = useState('clicker');

  const expToNextLevel = level * 100;
  const levelProgress = (experience / expToNextLevel) * 100;

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, maxEnergy));
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [maxEnergy]);

  useEffect(() => {
    if (experience >= expToNextLevel) {
      setLevel((prev) => prev + 1);
      setExperience(0);
    }
  }, [experience, expToNextLevel]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (energy >= 1) {
      setCoins((prev) => prev + clickPower);
      setExperience((prev) => prev + clickPower);
      setEnergy((prev) => Math.max(prev - 1, 0));
      setIsClicking(true);
      
      const rect = e.currentTarget.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setTimeout(() => {
        setIsClicking(false);
        setClickPosition(null);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen cyber-grid bg-background text-foreground overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-md flex-1 overflow-y-auto pb-24">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold neon-glow" style={{ color: 'var(--neon-pink)' }}>
                KITTY PAY
              </h1>
              <p className="text-sm opacity-70">Cyberpunk Clicker</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <Icon name="Coins" size={20} className="text-yellow-400" />
                <span className="text-2xl font-bold">{coins.toLocaleString()}</span>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                Level {level}
              </Badge>
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-2 neon-border" style={{ borderColor: 'var(--neon-cyan)' }}>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={16} className="text-yellow-400" />
                  <span>Energy</span>
                </div>
                <span className="font-bold">{energy}/{maxEnergy}</span>
              </div>
              <Progress value={(energy / maxEnergy) * 100} className="h-2" />

              <div className="flex items-center justify-between text-sm mt-4">
                <div className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={16} style={{ color: 'var(--neon-purple)' }} />
                  <span>Experience</span>
                </div>
                <span className="font-bold">{experience}/{expToNextLevel}</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

            <TabsContent value="profile" className="mt-4 space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-2" style={{ borderColor: 'var(--neon-purple)' }}>
                <div className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-5xl animate-pulse-glow">
                    🐱
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Hello Kitty NFT</h3>
                    <p className="text-sm opacity-70">Ваш персонаж</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold neon-glow" style={{ color: 'var(--neon-pink)' }}>{level}</p>
                      <p className="text-xs opacity-70">Уровень</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold neon-glow" style={{ color: 'var(--neon-cyan)' }}>{clickPower}</p>
                      <p className="text-xs opacity-70">Сила клика</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <div className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Award" size={18} style={{ color: 'var(--neon-purple)' }} />
                    Достижения
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">🏆 Первый клик</span>
                      <Badge variant="secondary">Выполнено</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">💎 Уровень 5</span>
                      <Badge variant="outline">В процессе</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="clicker" className="mt-4 space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-2 neon-border overflow-hidden" style={{ borderColor: 'var(--neon-pink)' }}>
                <div 
                  className="relative p-8 cursor-pointer select-none flex items-center justify-center min-h-[400px]"
                  onClick={handleClick}
                >
                  <div className={`text-9xl transition-transform ${isClicking ? 'animate-click-bounce' : 'animate-float'}`}>
                    🐱
                  </div>
                  {clickPosition && (
                    <div
                      className="absolute text-2xl font-bold animate-pulse-glow pointer-events-none"
                      style={{
                        left: clickPosition.x,
                        top: clickPosition.y,
                        color: 'var(--neon-pink)',
                      }}
                    >
                      +{clickPower}
                    </div>
                  )}
                </div>
              </Card>

              <div className="text-center text-sm opacity-70">
                <p>Нажмите на Hello Kitty для получения монет!</p>
                <p className="mt-1">Каждый клик: +{clickPower} монет и опыта</p>
              </div>
            </TabsContent>

            <TabsContent value="shop" className="mt-4 space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <div className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="ShoppingCart" size={18} style={{ color: 'var(--neon-cyan)' }} />
                    Покупки
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Icon name="Zap" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Энергия +500</p>
                          <p className="text-xs opacity-70">Восстановление</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        <Icon name="Coins" size={14} className="mr-1" />
                        1000
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Icon name="TrendingUp" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Сила клика +5</p>
                          <p className="text-xs opacity-70">Постоянно</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        <Icon name="Coins" size={14} className="mr-1" />
                        5000
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Icon name="Sparkles" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Новый скин</p>
                          <p className="text-xs opacity-70">Косметика</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        <Icon name="Coins" size={14} className="mr-1" />
                        10000
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="boosts" className="mt-4 space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <div className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Rocket" size={18} style={{ color: 'var(--neon-purple)' }} />
                    Усиления
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Zap" size={20} style={{ color: 'var(--neon-pink)' }} />
                          <span className="font-semibold">x2 Монеты</span>
                        </div>
                        <Badge variant="secondary">5 мин</Badge>
                      </div>
                      <p className="text-xs opacity-70 mb-3">Удвоение монет за клик</p>
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        Активировать
                      </Button>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Sparkles" size={20} style={{ color: 'var(--neon-cyan)' }} />
                          <span className="font-semibold">Автокликер</span>
                        </div>
                        <Badge variant="secondary">3 мин</Badge>
                      </div>
                      <p className="text-xs opacity-70 mb-3">Автоматические клики</p>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                        Активировать
                      </Button>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="BatteryCharging" size={20} style={{ color: 'var(--neon-purple)' }} />
                          <span className="font-semibold">Полная энергия</span>
                        </div>
                        <Badge variant="secondary">Мгновенно</Badge>
                      </div>
                      <p className="text-xs opacity-70 mb-3">Восстановление до максимума</p>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Активировать
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="more" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-card/50 backdrop-blur-sm border border-border cursor-pointer hover:border-primary transition-colors">
                  <div className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Icon name="Trophy" size={24} />
                    </div>
                    <p className="text-sm font-semibold">События</p>
                  </div>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border border-border cursor-pointer hover:border-primary transition-colors">
                  <div className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Icon name="Swords" size={24} />
                    </div>
                    <p className="text-sm font-semibold">Арена</p>
                  </div>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border border-border cursor-pointer hover:border-primary transition-colors">
                  <div className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={24} />
                    </div>
                    <p className="text-sm font-semibold">Задания</p>
                  </div>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border border-border cursor-pointer hover:border-primary transition-colors">
                  <div className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Icon name="Library" size={24} />
                    </div>
                    <p className="text-sm font-semibold">Коллекция</p>
                  </div>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border border-border cursor-pointer hover:border-primary transition-colors">
                  <div className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <Icon name="Settings" size={24} />
                    </div>
                    <p className="text-sm font-semibold">Настройки</p>
                  </div>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border border-border cursor-pointer hover:border-primary transition-colors">
                  <div className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Icon name="Newspaper" size={24} />
                    </div>
                    <p className="text-sm font-semibold">Новости</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border z-50">
        <div className="container mx-auto px-4 max-w-md">
          <div className="grid grid-cols-5 gap-1 py-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </button>
            <button
              onClick={() => setActiveTab('clicker')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                activeTab === 'clicker' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon name="MousePointer2" size={20} />
              <span className="text-xs">Кликер</span>
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                activeTab === 'shop' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon name="ShoppingBag" size={20} />
              <span className="text-xs">Магазин</span>
            </button>
            <button
              onClick={() => setActiveTab('boosts')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                activeTab === 'boosts' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon name="Zap" size={20} />
              <span className="text-xs">Бусты</span>
            </button>
            <button
              onClick={() => setActiveTab('more')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                activeTab === 'more' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon name="MoreHorizontal" size={20} />
              <span className="text-xs">Ещё</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}