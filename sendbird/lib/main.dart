// ignore_for_file: prefer_const_constructors, await_only_futures, unnecessary_null_comparison, library_private_types_in_public_api, use_key_in_widget_constructors, depend_on_referenced_packages

import 'package:flutter/material.dart';
import 'package:sendbird_sdk/sendbird_sdk.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: ChatDetail(),
  ));
}

class ChatDetail extends StatefulWidget {
  @override
  _ChatDetailState createState() => _ChatDetailState();
}

class _ChatDetailState extends State<ChatDetail> {
  final sendbird = SendbirdSdk(appId: "BC823AD1-FBEA-4F08-8F41-CF0D9D280FBF");
  late OpenChannel _currentChannel;
  final textFieldController = TextEditingController();
  final List<String> messages = [];

  @override
  void initState() {
    super.initState();
    joinOpenChannel();
  }

  Future<void> joinOpenChannel() async {
    try {
      final openChannel = await OpenChannel.getChannel(
          'sendbird_open_channel_14092_bf4075fbb8f12dc0df3ccc5c653f027186ac9211');
      await openChannel.enter();
      setState(() {
        _currentChannel = openChannel;
      });
    } catch (e) {
      // Handle errors
    }
  }

  void sendMessage() async {
    if (_currentChannel == null) return;

    final messageText = textFieldController.text;
    textFieldController.clear();

    try {
      final params = UserMessageParams(message: messageText);
      final message = await _currentChannel.sendUserMessage(params);

      setState(() {
        messages.add(message.message);
      });
    } catch (e) {
      // Handle errors
    }
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Scaffold(
        backgroundColor: Color.fromARGB(255, 3, 3, 3),
        appBar: AppBar(
          backgroundColor: Color.fromARGB(255, 19, 18, 18),
          titleSpacing: 0,
          title: Stack(
            children: [
              Row(
                children: [
                  IconButton(
                    padding: EdgeInsets.only(left: 20),
                    icon: Icon(
                      Icons.arrow_back_ios,
                      color: Color.fromARGB(255, 88, 88, 88),
                      size: 15,
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  SizedBox(
                    width: 130,
                  ),
                  Text(
                    'username',
                    style: TextStyle(
                      fontFamily: 'OrelegaOne',
                      fontSize: 20,
                      color: const Color.fromARGB(255, 143, 143, 143),
                    ),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: Icon(
                Icons.menu,
                color: Color.fromARGB(255, 88, 88, 88),
                size: 18,
              ),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            SizedBox(width: 10),
          ],
        ),
        body: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                return Align(
                  alignment: Alignment.centerRight,
                  child: Padding(
                    padding: const EdgeInsets.only(top: 8, right: 8),
                    child: Container(
                      decoration: BoxDecoration(
                        color: const Color.fromARGB(255, 3, 28, 49),
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(20),
                          bottomLeft: Radius.circular(20),
                          bottomRight: Radius.circular(20),
                        ),
                      ),
                      padding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: Text(
                        messages[index],
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
              child: Row(
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.add,
                      color: Color.fromARGB(255, 143, 143, 143),
                      size: 25,
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: Color.fromARGB(255, 88, 88, 88),
                        ),
                        borderRadius: BorderRadius.circular(36),
                      ),
                      child: Container(
                        height: 55,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 32, 32, 32),
                          borderRadius: BorderRadius.circular(36),
                        ),
                        child: Row(
                          children: [
                            SizedBox(width: 20),
                            Expanded(
                              child: TextField(
                                controller: textFieldController,
                                style: TextStyle(
                                  color: Color.fromARGB(255, 235, 235, 235),
                                  fontSize: 20,
                                ),
                                decoration: InputDecoration(
                                  hintText: "Type message.........",
                                  hintStyle: TextStyle(
                                    color: Color.fromARGB(239, 90, 90, 90),
                                    fontSize: 18,
                                  ),
                                  border: InputBorder.none,
                                  contentPadding:
                                      EdgeInsets.symmetric(vertical: 12),
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(right: 8.0),
                              child: SizedBox(
                                height: 30,
                                width: 30,
                                child: FloatingActionButton(
                                  backgroundColor:
                                      Color.fromARGB(255, 65, 64, 64),
                                  onPressed: sendMessage,
                                  child: Icon(
                                    Icons.arrow_upward,
                                    color: Color.fromARGB(255, 38, 38, 39),
                                    size: 20,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
